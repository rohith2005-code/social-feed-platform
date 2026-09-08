/**
 * Global Loader Component
 */

export const showLoader = () => {
    const loader = document.getElementById('global-loader');
    if (loader) {
        loader.classList.remove('hidden');
    }
};

export const hideLoader = () => {
    const loader = document.getElementById('global-loader');
    if (loader) {
        loader.classList.add('hidden');
    }
};
