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



export const CATEGORY_OPTIONS = [
	// A
	'Antiques',
	'Appliances',
	'Arts & Crafts',
	'Audio Equipment',
	'Auto Parts',
	// B
	'Baby & Kids',
	'Bicycles',
	'Boats & Marine',
	'Books & Magazines',
	'Business Equipment',
	// C
	'Campers & RVs',
	'Cars & Trucks',
	'CDs & DVDs',
	'Cell Phones',
	'Clothing & Shoes',
	'Collectibles',
	'Computer Equipment',
	'Computer Software',
	// E
	'Electronics',
	// F
	'Farming',
	'Furniture',
	// G
	'Games & Toys',
	'General',
	// H
	'Home & Garden',
	'Household',
	// J
	'Jewelry & Accessories',
	// M
	'Motorcycles',
	'Musical Instruments',
	// P
	'Pet Supplies',
	'Photography',
	// S
	'Sports & Outdoors',
	// T
	'Tickets',
	'Tools & Machinery',
	'TVs',
	// V
	'Video Equipment',
	'Video Games',
];