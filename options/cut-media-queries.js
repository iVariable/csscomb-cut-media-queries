module.exports = (function () {

	var moduleName = 'cut-media-queries';

	var lolArrayDiff = function(array1, array2) {
		var diff1 = array1.filter(function(elem){
			return array2.indexOf(elem) === -1;
		});

		var diff2 = array2.filter(function(elem){
			return array1.indexOf(elem) === -1;
		});

		return diff1.concat(diff2);
	}

	return {
		/**
		 * Option's name as it should be used in config.
		 */
		name: moduleName,

		/**
		 * List of syntaxes that this options supports.
		 * This depends on Gonzales PE possibilities.
		 * Currently the following work fine: css, less, sass, scss.
		 */
		syntax: ['css'],

		/**
		 * List patterns for option's acceptable value.
		 * You can play with following:
		 *   - boolean: [true, false]
		 *   - string: /^panda$/
		 *   - number: true
		 */
		accepts: {
			string: /.*/
		},

		/**
		 * If `accepts` is not enough for you, replace it with custom `setValue`
		 * function.
		 *
		 * @param {Object} value Value that a user sets in configuration
		 * @return {Object} Value that you would like to use in `process` method
		 *
		 * setValue: function(value) {
		 *     // Do something with initial value.
		 *     var final = value * 4;
		 *
		 *     // Return final value you will use in `process` method.
		 *     return final;
		 * },
		 */

		/**
		 * Fun part.
		 * Do something with AST.
		 * For example, replace all comments with flipping tables.
		 *
		 * @param {String} nodeType Type of current node
		 * @param {Array} node Node's content
		 */
		process: function (nodeType, node) {

			if (nodeType === 'stylesheet') {
				var length = node.length;

				var options = this.getValue(moduleName).split(',');

				while (length--) {
					if (node[length][0] == 'atruler') {

						var removeNode = false;

						//Gather media query info
						node[length].forEach(function (innerNode) {
							if (removeNode == true) return;
							if (innerNode[0] == 'atrulerq') {

								var queries = [];
								innerNode.forEach(function (query) {
									if (query[0] == 'braces') {

										var ident = query.filter(function (elem) {
											return elem[0] == 'ident';
										});
										var dimensions = query.filter(function (elem) {
											return elem[0] == 'dimension';
										});

										if (ident) {
											queries.push(ident[0][1] + ":" + dimensions[0][1][1] + dimensions[0][2][1]);
										}
									}
								});

								if (lolArrayDiff(queries, options).length == 0) {
									removeNode = true;
								}
							}
						});

						if (removeNode) {
							node.splice(length, 1);
						}

					}
				}
			}
		}
	};

})();

