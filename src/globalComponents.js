import Vue from 'vue';

import SpTextbox from "./components/atoms/sp-textbox"
import SpTextInput from "./components/molecules/sp-textinput"
import SpButton from "./components/atoms/sp-button"
import SpSubheader from "./components/atoms/sp-subheader"
import SpHeader from "./components/atoms/sp-header"
import SpNavbar from "./components/sp-navbar"
import SpText from "./components/atoms/sp-text"
import SpAvatarList from "./components/sp-avatar-list"
import SpAvatar from "./components/atoms/sp-avatar"
import SpList from "./components/sp-list/sp-list"
import SpListEl from "./components/sp-list/sp-list-el"
import SpCard from "./components/atoms/sp-card"
import SpLocationPicker from "./components/sp-location-picker"

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
Vue.component("sp-location-picker", SpLocationPicker);
Vue.component("sp-textinput", SpTextInput);