$(function() {
 Backbone.Form = Backbone.View.extend({
  loadFormValues: function() {
   var self = this;

   function load(obj, schema) {
    for(var attr in schema) {
     if(typeof(schema[attr]) == 'string')
      obj[attr] = self.$(schema[attr]).val();
     else
      obj[attr] = load(obj[attr], schema[attr]);
    }
    return obj;
   }

   for(var attr in this.schema) {
    var d = {};
    if(typeof(this.schema[attr]) == 'string') {
     d[attr] = this.$(this.schema[attr]).val();
    } else {
     d[attr] = load(this.model.get(attr), this.schema[attr]);
    }
    this.model.set(d);
   }
  },

  setFormValues: function() {
   var self = this;

   function setValues(obj, schema) {
    for(var attr in schema) {
     var d = obj[attr];
     if(typeof(schema[attr]) == 'string')
      self.$(schema[attr]).val(d);
     else
      setValues(d, schema[attr]);
    }
   }

   for(var attr in this.schema) {
    var d = this.model.get(attr);
    if(typeof(this.schema[attr]) == 'string') {
     this.$(this.schema[attr]).val(d);
    } else {
     setValues(d, this.schema[attr]);
    }
   }
  }
 });
});

