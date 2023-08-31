import classNames from 'classnames';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Checkbox, Dialog, Loading, Text } from '@deriv/components';
import { getLocation, PlatformContext, isMobile } from '@deriv/shared';
import { localize } from '@deriv/translations';
import { WS } from 'Services';
import { connect } from 'Stores/connect';
import PasswordSelectionModal from '../PasswordSelectionModal/password-selection-modal.jsx';
import ResidenceForm from '../SetResidenceModal/set-residence-form.jsx';
import CitizenshipForm from '../CitizenshipModal/set-citizenship-form.jsx';
import 'Sass/app/modules/account-signup.scss';
import validateSignupFields from './validate-signup-fields.jsx';
import { RudderStack } from '@deriv/analytics';

const AccountSignup = ({ enableApp, isModalVisible, clients_country, onSignup, residence_list }) => {
    const signupInitialValues = { citizenship: '', password: '', residence: '' };
    const { is_appstore } = React.useContext(PlatformContext);
    const [api_error, setApiError] = React.useState(false);
    const [is_loading, setIsLoading] = React.useState(true);
    const [country, setCountry] = React.useState('');
    const history_value = React.useRef();
    const [pw_input, setPWInput] = React.useState('');
    const [is_password_modal, setIsPasswordModal] = React.useState(false);
    const [is_disclaimer_accepted, setIsDisclaimerAccepted] = React.useState(false);

    const checkResidenceIsBrazil = selected_country =>
        selected_country && residence_list[indexOfSelection(selected_country)]?.value?.toLowerCase() === 'br';

    const disableButton = (values, errors) =>
        !(checkResidenceIsBrazil(values.residence) ? is_disclaimer_accepted : true) ||
        !values.residence ||
        !!errors.residence ||
        !values.citizenship ||
        !!errors.citizenship;

    const updatePassword = new_password => {
        setPWInput(new_password);
    };

    // didMount lifecycle hook
    React.useEffect(() => {
        WS.wait('website_status', 'residence_list').then(() => {
            if (clients_country && residence_list) {
                setCountry(getLocation(residence_list, clients_country, 'text'));
            }
            setIsLoading(false);
        });

        RudderStack.track(
            'ce_virtual_signup_form',
            {
                action: 'signup_confirmed',
                form_name: isMobile() ? 'virtual_signup_web_mobile_default' : 'virtual_signup_web_desktop_default',
            },
            {
                is_anonymous: true,
            }
        );

        RudderStack.track(
            'ce_virtual_signup_form',
            {
                action: 'country_selection_screen_opened',
                form_name: isMobile() ? 'virtual_signup_web_mobile_default' : 'virtual_signup_web_desktop_default',
            },
            {
                is_anonymous: true,
            }
        );
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const validateSignupPassthrough = values => validateSignupFields(values, residence_list);

    const indexOfSelection = selected_country =>
        residence_list.findIndex(item => item.text.toLowerCase() === selected_country?.toLowerCase());

    const onSignupPassthrough = values => {
        const index_of_selected_residence = indexOfSelection(values.residence);
        const index_of_selected_citizenship = indexOfSelection(values.citizenship);

        const modded_values = {
            ...values,
            residence: residence_list[index_of_selected_residence].value,
            citizenship: residence_list[index_of_selected_citizenship].value,
        };

        onSignup(modded_values, onSignupComplete);
    };

    const onSignupComplete = error => {
        if (error) {
            setApiError(error);

            RudderStack.track(
                'ce_virtual_signup_form',
                {
                    action: 'signup_flow_error',
                    form_name: isMobile() ? 'virtual_signup_web_mobile_default' : 'virtual_signup_web_desktop_default',
                    error_message: error,
                },
                {
                    is_anonymous: true,
                }
            );
        } else {
            isModalVisible(false);
            enableApp();

            RudderStack.track(
                'ce_virtual_signup_form',
                {
                    action: 'signup_done',
                    form_name: isMobile() ? 'virtual_signup_web_mobile_default' : 'virtual_signup_web_desktop_default',
                },
                {
                    is_anonymous: true,
                }
            );
        }
    };

    return (
        <div className='account-signup'>
            {is_loading ? (
                <Loading is_fullscreen={false} />
            ) : (
                <Formik
                    initialValues={signupInitialValues}
                    validate={validateSignupPassthrough}
                    onSubmit={onSignupPassthrough}
                    residence_list={residence_list}
                >
                    {({
                        isSubmitting,
                        handleBlur,
                        errors,
                        handleChange,
                        values,
                        setFieldValue,
                        setFieldTouched,
                        touched,
                    }) => (
                        <Form>
                            {!is_password_modal ? (
                                <div className='account-signup__main'>
                                    <Text as='h1' weight='bold' className='account-signup__heading'>
                                        {localize('Select your country and citizenship:')}
                                    </Text>
                                    <ResidenceForm
                                        class_prefix='account-signup'
                                        errors={errors}
                                        touched={touched}
                                        onResidenceSelectionChanged={() => setIsDisclaimerAccepted(false)}
                                        setFieldTouched={setFieldTouched}
                                        setFieldValue={setFieldValue}
                                        residence_list={residence_list}
                                        default_value={country}
                                        history_value={history_value.current}
                                    />
                                    <CitizenshipForm
                                        class_prefix='account-signup'
                                        errors={errors}
                                        touched={touched}
                                        setFieldTouched={setFieldTouched}
                                        setFieldValue={setFieldValue}
                                        citizenship_list={residence_list}
                                    />
                                    {checkResidenceIsBrazil(values.residence) && (
                                        <Checkbox
                                            checked={is_disclaimer_accepted}
                                            onChange={() => setIsDisclaimerAccepted(!is_disclaimer_accepted)}
                                            className='account-signup__checkbox'
                                            classNameLabel='account-signup__label'
                                            label={localize(
                                                'I hereby confirm that my request for opening an account with Deriv to trade OTC products issued and offered exclusively outside Brazil was initiated by me. I fully understand that Deriv is not regulated by CVM and by approaching Deriv I intend to set up a relation with a foreign company.'
                                            )}
                                        />
                                    )}
                                    <div className='account-signup__footer'>
                                        <Button
                                            className={classNames('account-signup__btn', {
                                                'account-signup__btn--disabled': disableButton(values, errors),
                                            })}
                                            is_disabled={disableButton(values, errors)}
                                            type='button'
                                            onClick={() => {
                                                history_value.current = values;
                                                setIsPasswordModal(true);
                                            }}
                                            primary
                                            large
                                            text={localize('Next')}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <PasswordSelectionModal
                                    api_error={api_error}
                                    errors={errors}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    is_appstore={is_appstore}
                                    isModalVisible={isModalVisible}
                                    isSubmitting={isSubmitting}
                                    touched={touched}
                                    pw_input={pw_input}
                                    setFieldTouched={setFieldTouched}
                                    updatePassword={updatePassword}
                                    values={values}
                                />
                            )}
                        </Form>
                    )}
                </Formik>
            )}
        </div>
    );
};

AccountSignup.propTypes = {
    clients_country: PropTypes.string,
    enableApp: PropTypes.func,
    onSignup: PropTypes.func,
    residence_list: PropTypes.array,
    isModalVisible: PropTypes.func,
};

const AccountSignupModal = ({
    enableApp,
    disableApp,
    clients_country,
    is_loading,
    is_visible,
    is_logged_in,
    logout,
    onSignup,
    residence_list,
    toggleAccountSignupModal,
}) => {
    React.useEffect(() => {
        // a logged in user should not be able to create a new account
        if (is_visible && is_logged_in) {
            logout();
        }
    }, [is_visible, is_logged_in, logout]);

    return (
        <Dialog
            className='account-signup__dialog'
            is_visible={is_visible}
            disableApp={disableApp}
            enableApp={enableApp}
            is_loading={is_loading || !residence_list.length}
            is_mobile_full_width={false}
        >
            <AccountSignup
                clients_country={clients_country}
                onSignup={onSignup}
                residence_list={residence_list}
                isModalVisible={toggleAccountSignupModal}
                enableApp={enableApp}
            />
        </Dialog>
    );
};

AccountSignupModal.propTypes = {
    clients_country: PropTypes.string,
    disableApp: PropTypes.func,
    enableApp: PropTypes.func,
    is_loading: PropTypes.bool,
    is_logged_in: PropTypes.bool,
    is_visible: PropTypes.bool,
    logout: PropTypes.func,
    onSignup: PropTypes.func,
    residence_list: PropTypes.arrayOf(PropTypes.object),
    toggleAccountSignupModal: PropTypes.func,
};

export default connect(({ ui, client }) => ({
    is_visible: ui.is_account_signup_modal_visible,
    toggleAccountSignupModal: ui.toggleAccountSignupModal,
    enableApp: ui.enableApp,
    disableApp: ui.disableApp,
    is_loading: ui.is_loading,
    onSignup: client.onSignup,
    is_logged_in: client.is_logged_in,
    residence_list: client.residence_list,
    clients_country: client.clients_country,
    logout: client.logout,
}))(AccountSignupModal);
