// custom cursor
let body = document.querySelector("body");
let cursor = document.querySelector(".cursor");

cursor.style.opacity = 0;
body.addEventListener("mousemove", (dets)=>{
    cursor.style.opacity = 1;
    cursor.style.left = dets.x+"px";
    cursor.style.top = dets.y+"px"
    setTimeout(()=>{
        cursor.style.opacity = 0;
    },3000)
})

// loading container

let loading = document.querySelector(".preloader");
setTimeout(()=>{
    loading.style.display = "none"
}, 1500)