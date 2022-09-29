export const getFormattedDate = (date) => {
    return new Date(date).toLocaleDateString('en-us', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};

export const addDays = (days) => {
    let today = new Date();
    let d = today.setDate(today.getDate() + days);
    return new Date(d);
}