import Clipboard from 'clipboard';
interface ClipboardOptions {
  /** Fixes IE by appending element to body */
  appendToBody: boolean;
  autoSetContainer: boolean;
}

export default {
  install: (app: any, options: ClipboardOptions) => {
    const autoSetContainer = options.autoSetContainer === void 0 ? false : options.autoSetContainer;
    app.directive('clipboard', {
      mounted(el: any, binding: any) {
        const { arg, value } = binding;
        switch (arg) {
          case 'success':
            el._vClipboardSuccess = value;
            break;
          case 'error':
            el._vClipboardError = value;
            break;
          default: {
            const clipboard = new Clipboard(el, {
              text: () => value,
              action: () => (arg === 'cut' ? 'cut' : 'copy'),
              container: autoSetContainer ? el : undefined,
            });
            clipboard.on('success', function (e) {
              const callback = el._vClipboardSuccess;
              callback && callback(e);
            });
            clipboard.on('error', function (e) {
              const callback = el._vClipboardError;
              callback && callback(e);
            });
            el._vClipboard = clipboard;
            break;
          }
        }
      },
      updated(el: any, binding: any) {
        const { arg, value } = binding;
        switch (arg) {
          case 'success':
            el._vClipboardSuccess = value;
            break;
          case 'error':
            el._vClipboardError = value;
            break;
          default:
            el._vClipboard.text = function () {
              return binding.value;
            };
            el._vClipboard.action = function () {
              return binding.arg === 'cut' ? 'cut' : 'copy';
            };
            break;
        }
      },
      unmounted(el, binding) {
        const { arg } = binding;
        switch (arg) {
          case 'success':
            delete el._vClipboard_success;
            break;
          case 'error':
            delete el._vClipboard_error;
            break;
          default:
            el._vClipboard.destroy();
            delete el._vClipboard;
            break;
        }
      },
    });
  },
};
export const useClipboard = function (text: string, container?: any, options?: ClipboardOptions) {
  const myOptions = options || { appendToBody: true };
  const appendToBody = myOptions.appendToBody;
  return new Promise(function (resolve, reject) {
    const fakeElement = document.createElement('button');
    const clipboard = new Clipboard(fakeElement, {
      text: () => text,
      action: () => 'copy',
      container: typeof container === 'object' ? container : document.body,
    });
    clipboard.on('success', function (e) {
      clipboard.destroy();
      resolve(e);
    });
    clipboard.on('error', function (e) {
      clipboard.destroy();
      reject(e);
    });
    if (appendToBody) document.body.appendChild(fakeElement);
    fakeElement.click();
    if (appendToBody) document.body.removeChild(fakeElement);
  });
};
