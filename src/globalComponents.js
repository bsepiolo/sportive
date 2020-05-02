import Vue from 'vue';

import SpTextbox from "./components/sp-textbox"
import SpButton from "./components/sp-button"
import SpSubheader from "./components/sp-subheader"
import SpHeader from "./components/sp-header"
import SpNavbar from "./components/sp-navbar"
import SpText from "./components/sp-text"
import SpAvatarList from "./components/sp-avatar-list"
import SpAvatar from "./components/sp-avatar"
import SpList from "./components/sp-list/sp-list"
import SpListEl from "./components/sp-list/sp-list-el"
import SpCard from "./components/sp-card"

Vue.component("sp-textbox", SpTextbox);
Vue.component("sp-button", SpButton);
Vue.component("sp-subheader", SpSubheader);
Vue.component("sp-header", SpHeader);
Vue.component("sp-navbar", SpNavbar);
Vue.component("sp-text", SpText);
Vue.component("sp-list", SpList);
Vue.component("sp-list-el", SpListEl);
Vue.component("sp-avatar", SpAvatar);
Vue.component("sp-avatar-list", SpAvatarList);
Vue.component("sp-card", SpCard);