		var url = 'pdfs/edcar-cacye.pdf';
			// The workerSrc property shall be specified.
			PDFJS.workerSrc = 'lib/pdf.js/build/pdf.worker.js';
		
			// Asynchronous download of PDF
			var loadingTask = PDFJS.getDocument(url);
			loadingTask.promise.then(function(pdf) {
			  console.log('PDF loaded');
			  
			  // Fetch the first page
			  var pageNumber = 1;
			  pdf.getPage(pageNumber).then(function(page) {
				console.log('Page loaded');
				
				var scale = 1.5;
				var viewport = page.getViewport(scale);

				// Prepare canvas using PDF page dimensions
				var canvas = document.getElementById('the-canvas');
				var context = canvas.getContext('2d');
				canvas.height = viewport.height;
				canvas.width = viewport.width;

				// Render PDF page into canvas context
				var renderContext = {
				  canvasContext: context,
				  viewport: viewport
				};
				var renderTask = page.render(renderContext);
				renderTask.then(function () {
				  console.log('Page rendered');
				  
					// add click event
					canvas.addEventListener('click', function(){
						var x = event.pageX - canvas.getBoundingClientRect().left;
						var y = event.pageY - canvas.getBoundingClientRect().top;
						console.log(x,y);
					});

				  
				  
				});
			  });
			}, function (reason) {
			  // PDF loading error
			  console.error(reason);
			});
		