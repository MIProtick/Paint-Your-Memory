// 
// Card in vue
// 
Vue.config.devtools = true;

Vue.component('card', {
    template: `
    <div class="card-wrap"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      ref="card">
      <div class="card"
        :style="cardStyle">
        <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
        <div class="card-info">
          <slot name="header"></slot>
          <slot name="content"></slot>
        </div>
      </div>
    </div>`,
    mounted() {
        this.width = this.$refs.card.offsetWidth;
        this.height = this.$refs.card.offsetHeight;
    },
    props: ['dataImage'],
    data: () => ({
        width: 0,
        height: 0,
        mouseX: 0,
        mouseY: 0,
        mouseLeaveDelay: null
    }),
    computed: {
        mousePX() {
            return this.mouseX / this.width;
        },
        mousePY() {
            return this.mouseY / this.height;
        },
        cardStyle() {
            const rX = this.mousePX * 30;
            const rY = this.mousePY * -30;
            return {
                transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
            };
        },
        cardBgTransform() {
            const tX = this.mousePX * -40;
            const tY = this.mousePY * -40;
            return {
                transform: `translateX(${tX}px) translateY(${tY}px)`
            }
        },
        cardBgImage() {
            return {
                backgroundImage: `url(${this.dataImage})`
            }
        }
    },
    methods: {
        handleMouseMove(e) {
            this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width / 2;
            this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height / 2;
        },
        handleMouseEnter() {
            clearTimeout(this.mouseLeaveDelay);
        },
        handleMouseLeave() {
            this.mouseLeaveDelay = setTimeout(() => {
                this.mouseX = 0;
                this.mouseY = 0;
            }, 1000);
        }
    }
});

const app = new Vue({
    el: '#app'
});


// fadeIn
window.onload = function () {
    anime({
        targets: '.cup_img',
        left: '0px',
        bottom: '0px',
        scale: [0, 1],
        opacity: [0, 0, 0, 1],
        duration: 2000,
        easing: 'easeInOutQuad'
    });
    anime({
        targets: '.tbl_img',
        opacity: [0, 1],
        duration: 2000,
        easing: 'easeInOutQuad'
    });
}

document.addEventListener('DOMContentLoaded', () => {
    var waypoint = new Waypoint({
        element: document.querySelector('.disc_sec'),
        handler: function (direction) {
            if (direction == 'down') {
                anime({
                    targets: '.cup_img',
                    left: '-550px',
                    bottom: '-50px',
                    scale: [1, 0],
                    opacity: [1, 0],
                    duration: 800,
                    easing: 'easeInOutQuad'
                });
                anime({
                    targets: '.tbl_img',
                    opacity: [1, 0],
                    duration: 1000,
                    easing: 'easeInOutQuad'
                });
            } else {
                anime({
                    targets: '.cup_img',
                    left: '0px',
                    bottom: '0px',
                    scale: [0, 1],
                    opacity: [0, 0, 1],
                    duration: 800,
                    easing: 'easeInOutQuad'
                });
                anime({
                    targets: '.tbl_img',
                    opacity: [0, 1],
                    duration: 1000,
                    easing: 'easeInOutQuad'
                });
            }
        },
        offset: '60%'
    });
});