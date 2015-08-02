(function(){


	var compiler = require("/repos/imba/lib/compiler");
	var snip = require('./snippets');
	
	var helper = require('./helper');
	var b = new helper.Benchmark("tokenize",{maxTime: 1});
	
	var reps = 4;
	
	var full = snip.NODES;
	var parts = full.split(/\n(?=export\s)/g);
	
	var temp = full.split(/\n(?=export\s)/g);
	var chunks = [];
	var sub = null;
	while(temp.length > 0){
		chunks.push(temp.splice(0,20).join("\n"));
	};
	
	console.log(("split into " + (parts.length) + " " + (chunks.length)));
	
	var src = new Array(2).join(snip.NODES.toString() + "\n\n\n");
	var long = new Array(reps).join(src + "\n\n\n");
	var short = src;
	
	
	
	// add tests
	b.add('full',function (){
		var len = 0;
		var tokens = compiler.tokenize(full);
		len = tokens.length;
		return;
	});
	
	
	b.add('parts',function (){
		var ary = [];
		var len = 0;
		
		parts.forEach(function (part,i){
			var sub = compiler.tokenize(part);
			return ary.push(sub);
		});
		return;
	});
	
	b.add('chunks',function (){
		var ary = [];
		var len = 0;
		
		chunks.forEach(function (part,i){
			var sub = compiler.tokenize(part);
			return ary.push(sub);
		});
		return;
	});
	
	// add tests
	b.add('single long',function (){
		var len = 0;
		var tokens = compiler.tokenize(long);// hmm
		len = tokens.length;
		// console.log len
		return;
	});
	
	
	b.add('split',function (){
		var ary = [];
		var count = reps;
		var len = 0;
		
		while(--count){
			var sub = compiler.tokenize(short);
			len += sub.length;
			ary.push(sub);
		};
		
		// console.log len
		return;
	});
	
	
	// now try with the real source
	
	// b.add('compile') do
	// 	var ast = compiler.parse(tokens)
	// 	ast.compile(ast) # hmm
	// 	# try
	// 	# 	compiler:ast.compile(ast) # hmm
	// 	# catch e
	// 	# 	console.log "ERROR {e:message}"
	
	// b.add('Token') do
	// 	var arr = []
	// 
	// 	var count = 200
	// 	while --count
	// 		var str = "mystring"
	// 		var val = Token.new(str,yes)
	// 		arr.push(val)
	// 	true
	
	// run async
	b.run();


}())