(function(w,d,u){

  var EventsList = {};
  
  var EventsListener = {};

  function EventConstructor(evtName,options)
  {
    if(!EventsList.hasOwnProperty(evtName))
      return new EventConstruct(evtName,options);
    else
      return new Error(evtName + " has already been constructed.");
  }

  function EventConstruct(evtName,options)
  {
    EventsList[evtName] = {
      event: options.event ? options.event : null,
      bubbles: options.bubbles ? options.bubbles : null,
      cancelable: options.cancelable ? options.cancelable : null,
      view: options.view ? options.view : w
    };
    
    return EventsList[evtName];
  }
  
  function fire(evtName)
  {
    if(EventsList.hasOwnProperty(evtName))
    {
      if(EventsListener.hasOwnProperty(evtName))
      {
        if(EventsListener[evtName].length)
        {
          var len = EventsListener[evtName].length;
          var Event = EventsList[evtName];
          while(len--)
          {
            EventsListener[evtName][len].call(Event.view,Event.event);
          }
          return true;
        }
      }
    }
    return false;
  }
  
  function isset(evtName)
  {
    if(EventsList.hasOwnProperty(evtName))
      return true;
    
    return false;
  }
  
  function listener(type,fn)
  {
    if(EventsList.hasOwnProperty(type))
    {
      if(EventsListener.hasOwnProperty(type))
      {
        EventsListener[type].push(fn);
      } else {
        EventsListener[type] = [];
        EventsListener[type].push(fn);
      }
      return true;
    }
  }
  
  EventConstructor.fire = fire;
  EventConstructor.isset = isset;
  EventConstructor.addEventListener = listener;

  window.EventConstructor = EventConstructor;

})(this,document);
