export function loadScriptAsync(_window: Window, url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const _document = _window.document;
    let isScriptLoading = false;

    if (_isDocumentLoaded()) {
      _loadScriptTag();
    } else {
      // Polling as well in case DOMContentLoaded is broken (i.e: WPRocket)
      _documentLoadingTimeoutHandler();

      _window.addEventListener('DOMContentLoaded', () => {
        _loadScriptTag();
      });
    }

    function _documentLoadingTimeoutHandler() {
      if (_isDocumentLoaded()) {
        _loadScriptTag();
      } else {
        setTimeout(_documentLoadingTimeoutHandler, 50);
      }
    }

    function _isDocumentLoaded(): boolean {
      return _document && _document.readyState !== 'loading';
    }

    function _loadScriptTag() {
      if (isScriptLoading) {
        return;
      }

      isScriptLoading = true;

      const scriptElement = _document.createElement('script');

      scriptElement.type = 'text/javascript';
      scriptElement.src = url;
      scriptElement.async = true;

      scriptElement.addEventListener('load', () => resolve());
      scriptElement.addEventListener('error', () => reject());

      _document.body.appendChild(scriptElement);
    }
  });
}