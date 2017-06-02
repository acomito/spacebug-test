import { Meteor } from 'meteor/meteor';


export const appConfig = {
	//app
	appName: Meteor.settings.public.config.appName,
	//support
	supportEmail: Meteor.settings.public.config.supportEmail,
	supportName: Meteor.settings.public.config.supportName,
};

export const PRODUCTION_URL = 'https://buysellloan.meteorapp.com';

export const DEFAULT_AVATAR = '/avatar.png';

