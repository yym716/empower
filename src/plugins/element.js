import Vue from 'vue'
import {
    Button, Container, Aside, Header, Main, Footer, Menu, MenuItem,
    Card, Table, TableColumn, Dialog, Tabs, TabPane, Dropdown, DropdownMenu,
    DropdownItem, RadioGroup, Loading, Message, Image, Popover, Tree, Switch,
    Drawer, Form, FormItem, MessageBox, TimePicker, InputNumber,Checkbox,CheckboxButton,CheckboxGroup,
    Select, Option, Input, Pagination, DatePicker, Submenu, RadioButton, Notification
} from 'element-ui'

Vue.use(Button);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(Pagination);
Vue.use(DatePicker);
Vue.use(Submenu);
Vue.use(RadioButton);
Vue.use(RadioGroup);
Vue.use(Loading);
Vue.use(Image);
Vue.use(Popover);
Vue.use(Tree);
Vue.use(Switch);
Vue.use(Drawer);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(TimePicker);
Vue.use(InputNumber);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);

Vue.prototype.$message = Message;
Vue.prototype.$messageBox = MessageBox;
Vue.prototype.$Notification = Notification;