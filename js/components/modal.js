/**
 * Modal Component
 * Can be used for confirmation dialogs or mobile create post
 */

export const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
};

export const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
};

// Auto-bind close buttons
document.addEventListener('DOMContentLoaded', () => {
    const closeBtns = document.querySelectorAll('.modal-close, .modal-overlay');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (e.target === this) {
                const modal = this.closest('.modal-container');
                if (modal) {
                    closeModal(modal.id);
                }
            }
        });
    });
});
