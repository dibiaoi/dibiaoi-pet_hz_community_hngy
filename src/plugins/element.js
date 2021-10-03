import Vue from 'vue'
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Backtop,
  Icon,
  Button,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Avatar,
  Popover,
  Input,
  Carousel,
  CarouselItem,
  Form,
  FormItem,
  Message,
  Alert,
  MessageBox,
  Cascader,
  RadioGroup,
  Checkbox,
  Radio,
  Upload,
  Pagination,
  Select,
  Option,
  DatePicker,
  Breadcrumb,
  BreadcrumbItem,
  Image,
  Table,
  TableColumn,
  radioButton,
  Dialog,
  Tag,
  Container,
  Aside,
  Scrollbar,
  TimePicker,
  Progress,
  Col,
  Row,
  Card,
  Badge,
  Autocomplete
} from 'element-ui'

Vue.use(Button)
Vue.use(Backtop)
Vue.use(Icon)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Avatar)
Vue.use(Popover)
Vue.use(Input)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Alert)
Vue.use(Cascader)
Vue.use(RadioGroup)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(Upload)
Vue.use(Pagination)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Image)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(radioButton)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(TableColumn)
Vue.use(Scrollbar)
Vue.use(Progress)
Vue.use(Col)
Vue.use(Row)
Vue.use(Card)
Vue.use(Badge)
Vue.use(Autocomplete)

export const message = Message
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
