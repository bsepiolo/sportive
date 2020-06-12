import Vue from 'vue';

import SpTextbox from "./components/atoms/a-sp-textbox"
import SpTextInput from "./components/molecules/m-sp-textinput"
import SpTextArea from "./components/atoms/a-sp-textarea"
import SpEventCard from "./components/molecules/m-sp-event-card"
import SpButton from "./components/atoms/a-sp-button"
import SpSubheader from "./components/atoms/a-sp-subtitle"
import SpHeader from "./components/atoms/a-sp-title"
import SpIcon from "./components/atoms/a-sp-icon"
import SpText from "./components/atoms/a-sp-text"
import SpAvatarList from "./components/sp-avatar-list"
import SpAvatar from "./components/atoms/a-sp-avatar"
import SpList from "./components/sp-list/sp-list"
import SpListEl from "./components/sp-list/sp-list-el"
import SpCard from "./components/atoms/a-sp-card"
import SpEventCardList from "./components/organisms/o-sp-event-card-list"
import SpLocationPicker from "./components/sp-location-picker"

Vue.component("sp-textbox", SpTextbox);
Vue.component("sp-button", SpButton);
Vue.component("sp-subtitle", SpSubheader);
Vue.component("sp-title", SpHeader);
Vue.component("sp-text", SpText);
Vue.component("sp-list", SpList);
Vue.component("sp-list-el", SpListEl);
Vue.component("sp-avatar", SpAvatar);
Vue.component("sp-avatar-list", SpAvatarList);
Vue.component("sp-card", SpCard);
Vue.component("sp-location-picker", SpLocationPicker);
Vue.component("sp-textinput", SpTextInput);
Vue.component("sp-textarea", SpTextArea);
Vue.component("sp-event-card", SpEventCard);
Vue.component("sp-icon", SpIcon);
Vue.component("sp-event-card-list", SpEventCardList);