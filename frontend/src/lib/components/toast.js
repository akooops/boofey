export function toast(text,type){

    let styleType = {
        success: ".bg-success",
    };
    Toastify({
        text,
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        style: {
            background: styleType[type],
        },
        // onClick: function(){} // Callback after click
    }).showToast();
}