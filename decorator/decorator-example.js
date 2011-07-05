Function.prototype.decorateWith = function ()
{
  var arguments = Array.prototype.slice.call(arguments);
  var decorator = arguments.shift();
  var decorated = this;
  var ret;
  var decoratedWrapper = function ()
  {
    arguments = Array.prototype.slice.call(arguments)
    arguments.shift();
    this.ret = decorated.apply(decorator, arguments);
    ret = this.ret;
    return this;
  }
  var decoratorWrapper = function ()
  {
    decorator.bind(decoratedWrapper).apply(this, arguments);
    return decoratedWrapper.ret;
  }
  decoratedWrapper.decorator = decorator;
  decoratedWrapper.decorated = decorated;
  decoratorWrapper.decorator = decorator;
  decoratorWrapper.decorated = decorated;
  return decoratorWrapper.bind(decorator, arguments);
}

Function.prototype.decorate = function ()
{
  var arguments = Array.prototype.slice.call(arguments);
  var decorator = this;
  var decorated = arguments.pop();
  arguments.unshift(decorator);
  return decorated.decorateWith.apply(decorated, arguments)
}

// 
// function one (oA1, oA2, oA3) {
  // // Do code
  // console.log('decorated function called with arguments:', arguments);
  // // Return value
  // return 'return value';
// }
// 
// function two (dArgs, oA1, oA2) {
  // // this.decorated = decorated function
  // // Do code
  // console.log('decorator function called with arguments',arguments);
  // oA1 = '1000';
  // // Run bound function, pass arguments through as is or mangled (including decorator args (they get stripped))
  // this.apply(this, arguments);
  // // Do more code
  // console.log('decorator function still running with returned value', this.ret);
  // this.ret += ' modified';
  // console.log('decorator function still running with modified value', this.ret);
// }
// 
// var three = one.decorateWith(two, 'arguments', 'for', 'decorator', 'only');
// 
// var four = two.decorate('arguments', 'for', 'decorator', 'only', one);
// 
// console.log (three('arguments', 'passed', 'to', 'both'));
// console.log ();
// console.log (four('arguments', 'passed', 'to', 'both'))


function my_decorator(dArgs, arg1)
{
  if (arg1 && dArgs[0])
    arg1 = 'overridden argument';
  this.apply(this, arguments);
  if (this.ret == 'monday' && dArgs[0] == 'no monday')
    this.ret = 'tuesday'
}

var my_function = my_decorator.decorate('no monday',
  function (arg1)
  {
    console.log (arg1);
    return ('monday');
  });

console.log (my_function('argu'));
