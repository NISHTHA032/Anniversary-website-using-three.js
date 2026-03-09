// THREE JS SCENE

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
)

const renderer = new THREE.WebGLRenderer({
canvas:document.querySelector('#bg')
})

renderer.setSize(window.innerWidth,window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

camera.position.z = 5


// PARTICLE GEOMETRY

const particlesGeometry = new THREE.BufferGeometry()

const particlesCount = 2000

const posArray = new Float32Array(particlesCount * 3)

for(let i=0;i<particlesCount * 3;i++){

posArray[i] = (Math.random() - 0.5) * 10

}

particlesGeometry.setAttribute(
'position',
new THREE.BufferAttribute(posArray,3)
)


// PARTICLE MATERIAL - Love Theme Colors

const particlesMaterial = new THREE.PointsMaterial({
size:0.02,
color:0xff69b4 // Hot pink
})

// Create multiple particle systems with different colors
const colors = [0xff69b4, 0xff1493, 0xffc0cb, 0xff6b9d]
const particleSystems = []

colors.forEach((color, index) => {
    const material = new THREE.PointsMaterial({
        size: 0.015 + (index * 0.003),
        color: color,
        transparent: true,
        opacity: 0.8
    })
    
    const mesh = new THREE.Points(particlesGeometry, material)
    mesh.rotation.y = index * 0.5
    scene.add(mesh)
    particleSystems.push(mesh)
})


// ANIMATION LOOP

function animate(){

requestAnimationFrame(animate)

// Animate all particle systems
particleSystems.forEach((system, index) => {
    system.rotation.y += 0.0005 * (index + 1)
    system.rotation.x += 0.0003 * (index + 1)
})

renderer.render(scene,camera)

}

animate()


// RESPONSIVE RESIZE

window.addEventListener("resize", () => {

renderer.setSize(window.innerWidth, window.innerHeight)

camera.aspect = window.innerWidth / window.innerHeight

camera.updateProjectionMatrix()

})


// CELEBRATE BUTTON EVENT

document.getElementById("celebrateBtn").onclick = function(){

const photo = document.getElementById("photoContainer")
const button = document.getElementById("celebrateBtn")

// hide button
button.style.display = "none"

// show photo
photo.style.display = "block"

setTimeout(() => {

photo.classList.add("show")

},200)

// Create heart confetti explosion
createHeartConfetti()

}

// HEART CONFETTI FUNCTION
function createHeartConfetti() {
    const colors = ['#ff1493', '#ff69b4', '#ff6b9d', '#ffc0cb', '#ff1e6e']
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div')
            heart.className = 'confetti-heart'
            heart.style.left = Math.random() * 100 + '%'
            heart.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
            heart.style.animationDelay = Math.random() * 2 + 's'
            heart.style.animationDuration = (Math.random() * 3 + 3) + 's'
            
            document.body.appendChild(heart)
            
            // Remove heart after animation
            setTimeout(() => {
                heart.remove()
            }, 6000)
        }, i * 50)
    }
}

// Add CSS for confetti hearts dynamically
const style = document.createElement('style')
style.textContent = `
    .confetti-heart {
        position: fixed;
        top: -50px;
        width: 15px;
        height: 15px;
        z-index: 100;
        pointer-events: none;
        animation: fallConfetti linear forwards;
    }
    
    .confetti-heart:before,
    .confetti-heart:after {
        content: "";
        position: absolute;
        width: 15px;
        height: 15px;
        background: inherit;
        border-radius: 50%;
    }
    
    .confetti-heart:before {
        top: -7.5px;
        left: 0;
    }
    
    .confetti-heart:after {
        left: 7.5px;
        top: 0;
    }
    
    @keyframes fallConfetti {
        0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0.5;
        }
    }
`
document.head.appendChild(style)