const sr = ScrollReveal ({
    origin:'top',
    distance : '40px',
    duration : '2500',
    reset : true
})

sr.reveal('.banner', {delay:500});




const srl = ScrollReveal ({
    origin:'left',
    distance : '40px',
    duration : '2500',
    reset : true
})

srl.reveal('#details', {delay:500});



const srr = ScrollReveal ({
    origin:'right',
    distance : '40px',
    duration : '2500',
    reset : true
})
srr.reveal('#product', {delay:500});


const srb = ScrollReveal ({
    origin:'bottom',
    distance : '40px',
    duration : '2500',
    reset : true
})

srb.reveal('.about', {delay:500});
srb.reveal('.chery', {delay:500});