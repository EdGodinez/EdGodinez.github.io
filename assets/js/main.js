/*==================== SHOW MENU ====================*/
/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    // Validate that variables exist
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/

const navLink = document.querySelectorAll('.nav__link')

function linkAction(){

    const navMenu = document.getElementById('nav-menu')

    // Remove active link from every option
    navLink.forEach(link => {
        link.classList.remove('active-link')
    })

    // Set clicked option as active
    this.classList.add('active-link')

    // Close menu
    navMenu.classList.remove('show-menu')
}

navLink.forEach(n => n.addEventListener('click', linkAction))


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/

const sections = document.querySelectorAll('section[id]')

function scrollActive(){

    const scrollY = window.pageYOffset

    sections.forEach(current => {

        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 100
        const sectionId = current.getAttribute('id')

        const link = document.querySelector(
            `.nav__menu a[href="#${sectionId}"]`
        )

        if(!link) return

        if(
            scrollY >= sectionTop &&
            scrollY < sectionTop + sectionHeight
        ){
            link.classList.add('active-link')
        }else{
            link.classList.remove('active-link')
        }

    })
}

window.addEventListener('scroll', scrollActive)



window.addEventListener('scroll', scrollActive)

/*==================== SHOW SCROLL TOP ====================*/ 
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 200) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})


/*==================== REDUCE THE SIZE AND PRINT ON AN A4 SHEET ====================*/

function scaleCv() {
    document.body.classList.add('scale-cv')
}

/*==================== REMOVE THE SIZE WHEN THE CV IS DOWNLOADED ====================*/

function removeScale() {
    document.body.classList.remove('scale-cv')
}

/*==================== GENERATE PDF ====================*/

// PDF generated area
const areaCv = document.getElementById('area-cv')
const resumeButton = document.getElementById('resume-button')

// Html2pdf options
const opt = {
    margin: 0,

    filename: 'CV-EduardoGodinez.pdf',

    image: {
        type: 'jpeg',
        quality: 0.98
    },

    html2canvas: {
        scale: 2,
        useCORS: true,
        scrollX: 0,
        scrollY: 0
    },

    jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
    }
}

/*==================== FUNCTION TO GENERATE PDF ====================*/

async function generateResume() {

    // Apply the PDF-specific styles
    scaleCv()

    try {

        // Wait for fonts to be completely loaded
        await document.fonts.ready

        // Give the browser time to recalculate the layout
        await new Promise(resolve => {
            requestAnimationFrame(() => {
                requestAnimationFrame(resolve)
            })
        })

        // Generate and download the PDF
        await html2pdf()
            .set(opt)
            .from(areaCv)
            .save()

    } catch (error) {

        console.error('Error generating PDF:', error)

    } finally {

        // Restore the normal web design only after PDF generation finishes
        removeScale()
    }
}

/*==================== DOWNLOAD BUTTON ====================*/

resumeButton.addEventListener('click', generateResume)