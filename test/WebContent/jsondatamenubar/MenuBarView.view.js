sap.ui.jsview("jsondatamenubar.MenuBarView", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf jsondatamenubar.MenuBarView
	*/ 
	getControllerName : function() {
		return "jsondatamenubar.MenuBarView";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf jsondatamenubar.MenuBarView
	*/ 
	createContent : function(oController) {
		// Load the Model from the File
	    var oModel = new sap.ui.model.json.JSONModel();  
	    oModel.loadData("Model/MenuBar.json", "", false);  
	    
	    // Create a Menubar instance
	    var oMenuBar = new sap.ui.commons.MenuBar(this.createId("menubar")).placeAt("content");  
	    oMenuBar.setModel(oModel);  

	    var oMenuItemTemplate = new sap.ui.commons.MenuItem({
			text : "{Value}"
		});  
	    
	    var oSubMenu = new sap.ui.commons.Menu(this.createId("submenu"));  
	    
	    var oSubMenuItemTemplate = new sap.ui.commons.MenuItem({  
	      text : "{Value}"  
	    });  
	    
	    oMenuBar.bindAggregation("items", {
	    	path: "/Menu", factory:function(sId,oCtx){
	    		var oCloneItem = oMenuItemTemplate.clone(sId);
	    		if ( oCtx.getProperty('SubMenu').length > 0 ) {
	    			var oCurrentSubMenu = oSubMenu.clone(sId);
	    	        oCurrentSubMenu.bindAggregation("items",{path: oCtx.sPath +"/SubMenu", 
	    	                                                   template :  oSubMenuItemTemplate
	    	                                                  });
	    	        oCloneItem.setSubmenu(oCurrentSubMenu);          
	    	    }
	    		return oCloneItem;
	    	}
	    });
	    
 
//	    oMenuBar.bindAggregation(
//	    		"items", {
//	    			path: "/Menu", 
//	    			template: oMenuItemTemplate  
//	            }
//	    );  
	    
	}

});
