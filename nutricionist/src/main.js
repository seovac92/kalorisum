import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from  '@fortawesome/free-solid-svg-icons'
import { faBowlFood} from  '@fortawesome/free-solid-svg-icons'
import { faTrash} from  '@fortawesome/free-solid-svg-icons'
import { faWeightHanging} from  '@fortawesome/free-solid-svg-icons'
import { faPlus} from  '@fortawesome/free-solid-svg-icons'
import { faWeightScale} from  '@fortawesome/free-solid-svg-icons'
import { faPaperPlane} from  '@fortawesome/free-solid-svg-icons'

library.add(faBars)
library.add(faAngleLeft)
library.add(faAngleRight)
library.add(faCircleXmark)
library.add(faBowlFood)
library.add(faTrash)
library.add(faWeightHanging)
library.add(faPlus)
library.add(faWeightScale)
library.add(faPaperPlane)

createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
