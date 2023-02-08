/**
 * Conservation des fonction réalisée initialement et appelée en direcct par html
 */

/**
 * Display de la modale de contact
 */
// eslint-disable-next-line no-unused-vars
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

/**
 * Masquage de la modale (sans supression du domaine)
 */
// eslint-disable-next-line no-unused-vars
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}