import { Meteor } from 'meteor/meteor';


export const appConfig = {
	//app
	appName: Meteor.settings.public.config.appName,
	//support
	supportEmail: Meteor.settings.public.config.supportEmail,
	supportName: Meteor.settings.public.config.supportName,
};

export const PRODUCTION_URL = 'https://junkbook.meteorapp.com';

export const DEFAULT_AVATAR = '/avatar.png';
export const DEFAULT_POST_IMAGE = 'http://www.dormirsinllorar.com/wp-content/plugins/wp-posts-carousel/images/placeholder.png' //http://www.freeiconspng.com/uploads/no-image-icon-13.png';

export const STATUS_OPTIONS = [
	'For Free',
	'For Sale',
	'For Borrow',
	'Not Available',
];

export const CATEGORY_OPTIONS = STATUS_OPTIONS

export const ROLE_OPTIONS = [
	'admin',
];

export const MACHINE_MODEL_CATEGORIES = [
	'bicep/triceps',
	'other',
];


export const USER_MODEL_TYPES = [
	'gym-goer',
	'gym-owner',
	'gym-manager',
	'manufacturer'
];

