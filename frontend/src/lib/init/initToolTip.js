export function initToolTip(container){
    const tooltipTriggerList = container.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl)
    })



}