const pdfUrl = '../docs/5e_Wolves_of_Welton.pdf'

let pdfDoc = null,
    pageNum = 1,
    pageIsRendering = false
pageNumIsPending = null;

const scale = 1.0,
    canvas = document.querySelector('#pdf-render'),
    ctx = canvas.getContext('2d');

// Render the page
const renderPage = num => {
    pageIsRendering = true;

    // Get page
    pdfDoc.getPage(num).then(page => {

        var wrapper = document.getElementById('pdf-wrapper');
        var buttonRow = document.getElementById('button-row');

        // Set Scale

        const newScale = Math.min(
            (wrapper.offsetWidth / page.getViewport({ scale }).width),
            ((wrapper.offsetHeight - buttonRow.offsetHeight) / page.getViewport({ scale }).height));
        const viewport = page.getViewport({ scale: newScale });

        canvas.height = viewport.height;
        canvas.width = viewport.width

        const renderCtx = {
            canvasContext: ctx,
            viewport
        };


        page.render(renderCtx).promise.then(() => {
            pageIsRendering = false;

            if (pageNumIsPending !== null) {
                renderPage(pageNumIsPending);
                pageNumIsPending = null;
            };
        })

        // Output current page
        document.querySelector('#page-num').textContent = num;
    });
};

// Check for pages rendering 
const queueRenderPage = num => {
    if (pageIsRendering) {
        pageNumIsPending = num;
    } else {
        renderPage(num);
    }
}

// Show Prev Page
const showPrevPage = () => {
    if (pageNum <= 1) {
        return;
    }
    pageNum--;
    queueRenderPage(pageNum);
}

// Show Next Page
const showNextPage = () => {
    if (pageNum >= pdfDoc.numPages) {
        return;
    }
    pageNum++;
    queueRenderPage(pageNum);
}

// Get Document
pdfjsLib.getDocument(pdfUrl).promise.then(pdfDoc_ => {
    pdfDoc = pdfDoc_;

    document.querySelector('#page-count').textContent = pdfDoc.numPages;

    renderPage(pageNum);
})
    .catch(err => {
        // Display error
        const div = document.createElement('div');
        div.className = 'error';
        div.appendChild(document.createTextNode(err.message));
        document.querySelector('body').insertBefore(div, canvas);
        // Remove top bar
        document.querySelector('.top-bar').style.display = 'none'
    })

// Button Events
document.querySelector('#prev-page').addEventListener('click', showPrevPage);
document.querySelector('#next-page').addEventListener('click', showNextPage);
var resizeID;
window.addEventListener('resize', function () {
    clearTimeout(resizeID);
    resizeID = setTimeout(function () {
        if (pdfDoc !== null) {
            queueRenderPage(pageNum);
        }
    }, 500);
});