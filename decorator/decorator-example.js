Function.prototype.decorate = function ()
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

function one (oA1, oA2, oA3) {
  // Do code
  console.log('decorated function called with arguments:', arguments);
  // Return value
  return 'return value';
}

function two (dArgs, oA1, oA2) {
  // this.decorated = decorated function
  // Do code
  console.log('decorator function called with arguments',arguments);
  // Run bound function, pass arguments through as is or mangled (including decorator args (they get stripped))
  this.apply(this, arguments);
  // Do more code
  console.log('decorator function still running with returned value', this.ret);
  this.ret += ' modified';
  console.log('decorator function still running with modified value', this.ret);
}

var three = one.decorate(two, 'arguments', 'for', 'decorator', 'only');

console.log (three('arguments', 'passed', 'to', 'both'));
