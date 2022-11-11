import classNames from 'classnames';
import React, { ReactElement, ReactNode, RefObject } from 'react';
import { CSSTransition } from 'react-transition-group';
import Dropzone, { DropzoneOptions } from 'react-dropzone';
import { truncateFileName } from '@deriv/shared';
import Text from '../text';

type TFadeInMessage = {
    is_visible: boolean;
    color?: string;
    key?: string;
    timeout: number;
    no_text?: boolean;
};

type TPreviewSingle = {
    dropzone_ref: RefObject<HTMLElement>;
} & TFileDropzone;

type TFileDropzone = {
    className?: string;
    noClick?: boolean;
    validation_error_message: (open?: () => void) => ReactNode | null;
    max_size?: number;
    value: Array<{ name: string }>;
    message: (open?: () => void) => ReactNode;
    filename_limit?: number;
    error_message: string;
    hover_message: string;
    preview_single?: ReactElement;
} & DropzoneOptions;

const FadeInMessage = ({
    is_visible,
    color,
    children,
    key,
    timeout,
    no_text,
}: React.PropsWithChildren<TFadeInMessage>) => (
    <CSSTransition
        appear
        key={key}
        in={is_visible}
        timeout={timeout}
        classNames={{
            appear: 'dc-file-dropzone__message--enter',
            enter: 'dc-file-dropzone__message--enter',
            enterActive: 'dc-file-dropzone__message--enter-active',
            enterDone: 'dc-file-dropzone__message--enter-done',
            exit: 'dc-file-dropzone__message--exit',
            exitActive: 'dc-file-dropzone__message--exit-active',
        }}
        unmountOnExit
    >
        {no_text ? (
            <div className='dc-file-dropzone__message'>{children}</div>
        ) : (
            <Text
                align='center'
                color={color || 'general'}
                size='xxs'
                line_height='m'
                weight='normal'
                className='dc-file-dropzone__message'
            >
                {children}
            </Text>
        )}
    </CSSTransition>
);

const PreviewSingle = (props: TPreviewSingle) => {
    if (props.preview_single) {
        return <div className='dc-file-dropzone__message'>{props.preview_single}</div>;
    }
    return (
        <Text
            size='xxs'
            weight='bold'
            align='center'
            className='dc-file-dropzone__filename'
            styles={{
                maxWidth: `calc(${props.dropzone_ref.current?.offsetWidth || 365}px - 3.2rem)`,
            }}
        >
            {props.filename_limit ? truncateFileName(props.value[0], props.filename_limit) : props.value[0].name}
        </Text>
    );
};

const FileDropzone = ({ className, noClick = false, ...props }: TFileDropzone) => {
    const dropzone_ref = React.useRef(null);

    const message = props.message();
    const validationErrorMessage = props.validation_error_message();

    return (
        <Dropzone
            // sends back accepted files array
            onDropAccepted={props.onDropAccepted}
            // sends back rejected files array
            onDropRejected={props.onDropRejected}
            // allow multiple uploads
            multiple={props.multiple || false}
            // accept prop is same as native HTML5 input accept - e.g - 'image/png'
            accept={props.accept}
            // set maximum size limit for file, in bytes (binary)
            maxSize={props.max_size}
            noClick={noClick}
        >
            {({ getRootProps, getInputProps, isDragAccept, isDragActive, isDragReject, open }) => (
                <div
                    {...getRootProps()}
                    className={classNames('dc-file-dropzone', className, {
                        'dc-file-dropzone--is-active': isDragActive,
                        'dc-file-dropzone--has-file': isDragActive || props.value.length > 0,
                        'dc-file-dropzone--has-error': (isDragReject || !!validationErrorMessage) && !isDragAccept,
                        'dc-file-dropzone--is-noclick': noClick,
                    })}
                    ref={dropzone_ref}
                >
                    <input {...getInputProps()} data-testid='dt_file_upload_input' />
                    <div className='dc-file-dropzone__content'>
                        <FadeInMessage
                            // default message when not on hover or onDrag
                            is_visible={!isDragActive && !!message && props.value.length < 1 && !validationErrorMessage}
                            timeout={150}
                            no_text={noClick}
                        >
                            {props.message(open)}
                        </FadeInMessage>
                        <FadeInMessage
                            // message shown on hover if files are accepted onDrag
                            is_visible={isDragActive && !isDragReject}
                            timeout={150}
                        >
                            {props.hover_message}
                        </FadeInMessage>
                        {/* Handle cases for displaying multiple files and single filenames */}

                        {props.multiple && props.value.length > 0 && !validationErrorMessage
                            ? props.value.map((file, idx) => (
                                  <Text
                                      size='xxs'
                                      weight='bold'
                                      align='center'
                                      key={idx}
                                      className='dc-file-dropzone__filename'
                                  >
                                      {props.filename_limit ? truncateFileName(file, props.filename_limit) : file.name}
                                  </Text>
                              ))
                            : props.value[0] &&
                              !isDragActive &&
                              !validationErrorMessage && <PreviewSingle dropzone_ref={dropzone_ref} {...props} />}
                        <FadeInMessage
                            // message shown if there are errors with the dragged file
                            is_visible={isDragReject}
                            timeout={150}
                            color='loss-danger'
                        >
                            {props.error_message}
                        </FadeInMessage>
                        <FadeInMessage
                            // message shown on if there are validation errors with file uploaded
                            is_visible={!!validationErrorMessage && !isDragActive}
                            timeout={150}
                            color='loss-danger'
                        >
                            {props.validation_error_message(open)}
                        </FadeInMessage>
                    </div>
                </div>
            )}
        </Dropzone>
    );
};

export default FileDropzone;
