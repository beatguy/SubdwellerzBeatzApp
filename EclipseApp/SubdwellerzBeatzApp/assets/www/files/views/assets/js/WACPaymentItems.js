/**
	ItemMap variable tores items information. Keys are WACPayment item ids, and value is a map of properties,
	where name and image are default ones with this plugin. It's populated dynalically from 
	GetItemProperties service
*/
var itemMap = {};

/**
   If this function returns true, item with /itemId/ is shown in the app,
   and not shown otherwise
*/
function itemsFilter(itemId) { // return only items defined above
	return itemMap.hasOwnProperty(itemId);
}