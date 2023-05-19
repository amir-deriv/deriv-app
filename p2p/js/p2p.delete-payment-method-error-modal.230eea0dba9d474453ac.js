/*! For license information please see p2p.delete-payment-method-error-modal.230eea0dba9d474453ac.js.LICENSE.txt */
"use strict";(self.webpackChunk_deriv_p2p=self.webpackChunk_deriv_p2p||[]).push([["delete-payment-method-error-modal"],{"./src/components/modal-manager/modals/delete-payment-method-error-modal.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _deriv_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @deriv/components */ "@deriv/components");\n/* harmony import */ var _deriv_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_deriv_components__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var mobx_react_lite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mobx-react-lite */ "../../node_modules/mobx-react-lite/es/index.js");\n/* harmony import */ var Stores__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Stores */ "./src/stores/index.js");\n/* harmony import */ var Components_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! Components/i18next */ "./src/components/i18next/index.js");\n/* harmony import */ var Components_modal_manager_modal_manager_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! Components/modal-manager/modal-manager-context */ "./src/components/modal-manager/modal-manager-context.js");\n\n\n\n\n\n\nvar DeletePaymentMethodErrorModal = function DeletePaymentMethodErrorModal() {\n  var _useStores = (0,Stores__WEBPACK_IMPORTED_MODULE_3__.useStores)(),\n    general_store = _useStores.general_store,\n    my_profile_store = _useStores.my_profile_store;\n  var _useModalManagerConte = (0,Components_modal_manager_modal_manager_context__WEBPACK_IMPORTED_MODULE_5__.useModalManagerContext)(),\n    hideModal = _useModalManagerConte.hideModal,\n    is_modal_open = _useModalManagerConte.is_modal_open;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {\n    is_open: is_modal_open,\n    small: true,\n    has_close_icon: false,\n    title: (0,Components_i18next__WEBPACK_IMPORTED_MODULE_4__.localize)(\'That payment method cannot be deleted\'),\n    onMount: function onMount() {\n      return general_store.setIsModalOpen(true);\n    },\n    onUnmount: function onUnmount() {\n      return general_store.setIsModalOpen(false);\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Modal.Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Text, {\n    as: "p",\n    size: "xs",\n    color: "prominent"\n  }, my_profile_store.delete_error_message)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Modal.Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_deriv_components__WEBPACK_IMPORTED_MODULE_1__.Button, {\n    has_effect: true,\n    text: (0,Components_i18next__WEBPACK_IMPORTED_MODULE_4__.localize)(\'Ok\'),\n    onClick: hideModal,\n    primary: true,\n    large: true\n  })));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,mobx_react_lite__WEBPACK_IMPORTED_MODULE_2__.observer)(DeletePaymentMethodErrorModal));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9tb2RhbC1tYW5hZ2VyL21vZGFscy9kZWxldGUtcGF5bWVudC1tZXRob2QtZXJyb3ItbW9kYWwuanN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGRlcml2L3AycC8uL3NyYy9jb21wb25lbnRzL21vZGFsLW1hbmFnZXIvbW9kYWxzL2RlbGV0ZS1wYXltZW50LW1ldGhvZC1lcnJvci1tb2RhbC5qc3g/OTQzYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQnV0dG9uLCBNb2RhbCwgVGV4dCB9IGZyb20gJ0BkZXJpdi9jb21wb25lbnRzJztcbmltcG9ydCB7IG9ic2VydmVyIH0gZnJvbSAnbW9ieC1yZWFjdC1saXRlJztcbmltcG9ydCB7IHVzZVN0b3JlcyB9IGZyb20gJ1N0b3Jlcyc7XG5pbXBvcnQgeyBsb2NhbGl6ZSB9IGZyb20gJ0NvbXBvbmVudHMvaTE4bmV4dCc7XG5pbXBvcnQgeyB1c2VNb2RhbE1hbmFnZXJDb250ZXh0IH0gZnJvbSAnQ29tcG9uZW50cy9tb2RhbC1tYW5hZ2VyL21vZGFsLW1hbmFnZXItY29udGV4dCc7XG5cbmNvbnN0IERlbGV0ZVBheW1lbnRNZXRob2RFcnJvck1vZGFsID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZ2VuZXJhbF9zdG9yZSwgbXlfcHJvZmlsZV9zdG9yZSB9ID0gdXNlU3RvcmVzKCk7XG4gICAgY29uc3QgeyBoaWRlTW9kYWwsIGlzX21vZGFsX29wZW4gfSA9IHVzZU1vZGFsTWFuYWdlckNvbnRleHQoKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxNb2RhbFxuICAgICAgICAgICAgaXNfb3Blbj17aXNfbW9kYWxfb3Blbn1cbiAgICAgICAgICAgIHNtYWxsXG4gICAgICAgICAgICBoYXNfY2xvc2VfaWNvbj17ZmFsc2V9XG4gICAgICAgICAgICB0aXRsZT17bG9jYWxpemUoJ1RoYXQgcGF5bWVudCBtZXRob2QgY2Fubm90IGJlIGRlbGV0ZWQnKX1cbiAgICAgICAgICAgIG9uTW91bnQ9eygpID0+IGdlbmVyYWxfc3RvcmUuc2V0SXNNb2RhbE9wZW4odHJ1ZSl9XG4gICAgICAgICAgICBvblVubW91bnQ9eygpID0+IGdlbmVyYWxfc3RvcmUuc2V0SXNNb2RhbE9wZW4oZmFsc2UpfVxuICAgICAgICA+XG4gICAgICAgICAgICA8TW9kYWwuQm9keT5cbiAgICAgICAgICAgICAgICA8VGV4dCBhcz0ncCcgc2l6ZT0neHMnIGNvbG9yPSdwcm9taW5lbnQnPlxuICAgICAgICAgICAgICAgICAgICB7bXlfcHJvZmlsZV9zdG9yZS5kZWxldGVfZXJyb3JfbWVzc2FnZX1cbiAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICA8L01vZGFsLkJvZHk+XG4gICAgICAgICAgICA8TW9kYWwuRm9vdGVyPlxuICAgICAgICAgICAgICAgIDxCdXR0b24gaGFzX2VmZmVjdCB0ZXh0PXtsb2NhbGl6ZSgnT2snKX0gb25DbGljaz17aGlkZU1vZGFsfSBwcmltYXJ5IGxhcmdlIC8+XG4gICAgICAgICAgICA8L01vZGFsLkZvb3Rlcj5cbiAgICAgICAgPC9Nb2RhbD5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgb2JzZXJ2ZXIoRGVsZXRlUGF5bWVudE1ldGhvZEVycm9yTW9kYWwpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/modal-manager/modals/delete-payment-method-error-modal.jsx\n')}}]);