var Arr = [];
	var len = Arr.length;
	var time = 20;

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext("2d");

	var rangeTime = document.getElementById("rangeTime");
	var rangeArr = document.getElementById("rangeArr");	

	var showTime = document.getElementById("showTime");//use in range
	var showLength = document.getElementById("showLength");//use in range

	createArr(100)
	randomArr()
	drawArr(Arr);

	function createArr(number){
		Arr = [];
		for(var i=1; i<=number; i++){
			Arr.push(i);
		}
		len = Arr.length;
		return Arr;
	}
	function randomArr(){
		var index = len, random;
		while(0!==index){
			random = Math.floor(Math.random() * index);
			index -= 1;
			swapIndex(Arr,index,random);
			}
		drawArr(Arr);
		return Arr;
	}
	function swapIndex(arr,i,j){
		var temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
		return arr;
	}
	function drawArr(arr){
		var x = 0;
		var wid = canvas.width/len;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (var i = 0; i < len; i++) {
			ctx.beginPath();
			ctx.fillStyle = "#424242";
			ctx.fillRect(x,(canvas.height)-arr[i]*(wid/2),wid, (canvas.height));
			ctx.closePath();
			x += wid;
		}
	}
	function sleep(ms){
		return new Promise(resolve =>setTimeout(resolve,ms));	
	}

	// using of "async" to use "await"
	async function bubbelSort(Arr){
			for (var i = len-1; i>=0; i--){
     			for(var j = 1; j<=i; j++){
       				if(Arr[j-1]>Arr[j]){
           			swapIndex(Arr,j,j-1);// Animation Performs when swaping is done in array;
         			await drawArr(Arr);	//drawArr() animate the array
        				await sleep(time);		//await sleep() pause the function (act as a dealy time)
        			}
     			}
   			}
	} 	

	async function selectionSort(arr){
		var minIdx;
  		for(var i = 0; i < len; i++){
    		minIdx = i;
    		for(var  j = i+1; j<len; j++){
      			if(arr[j]<arr[minIdx]){
       				minIdx = j;
       			}
    		}
    		await swapIndex(arr,i,minIdx);
    		await drawArr(arr);
    		await sleep(time)
  		}
  		return arr;
	}

	async function insertionSort(arr){
	  var i, el, j;

	  for(i = 1; i<len; i++){
		    el = arr[i];
		    j = i;

		    while(j>0 && arr[j-1]>el){
			      arr[j] = arr[j-1];
			      await drawArr(arr);
			      await sleep(10);
			      j--;
			   }
			   arr[j] = el;
			   	await drawArr(arr);
			    await sleep(time);
			  }

		  return arr;
	}

	async function quickSort(arr){
		await QS(0,len-1);
		async function partition(pivot,left,right){
			const pivotValue = arr[pivot];
			var	partitionIndex = left;
			var i = left;

			for(var i = left; i < right; i++){
			   	if(arr[i] < pivotValue){
			    	 	await swapIndex(arr, i, partitionIndex);
			    	 	await drawArr(arr);
						await sleep(time);
			      		partitionIndex++;
			    	}
			  }
			await swapIndex(arr, right, partitionIndex);
			await drawArr(arr);
			await sleep(time);
			return Promise.resolve(partitionIndex);
		}
		async function QS(left,right){
			if(left < right){
				const pivot = right;
				const partitionIndex =  await partition(pivot,left,right);
				await QS(left,partitionIndex-1);
				await QS(partitionIndex+1,right);
				}
			return Promise.resolve();	
		}
	}

	function mergeSort(Arr){
		inPlaceSort(Arr,0,len-1)

		async function inPlaceSort(x, first, last){

			var left, mid, right, temp;

			if(first>=last)	return Promise.resolve();

			mid = Math.floor((first+last)/2);

			await inPlaceSort(x,first,mid);
			await inPlaceSort(x,mid+1,last);

			left = first;
			right = mid+1;

				if(x[mid] <= x[right])	return;
				
				while(left <= mid && right <= last){
					if(x[left] <= x[right]){
						left++;
					}
					else{
						temp = x[right];
						await moveArr(x,left,right);
						x[left] = temp;
						await drawArr(x);
						await sleep(time);
	     				left++; right++; mid++;
						}
					}
					return Promise.resolve();
				}

		function moveArr(x,left,right){ 
			var tempArr = [];
			for(var i=0, j=left; i<(right-left); i++,j++){
					tempArr[i] = x[j];
			}

			for(var i=0, j=left+1; i<(right-left); i++,j++){
					x[j] = tempArr[i];
			}
			return Promise.resolve(x);
		}
	}

	function heapSort(arr){

		async function max_heapify(a, i, length) {
    		while (true) {
    		    var left = i*2 + 1;
    		    var right = i*2 + 2;
    		    var largest = i;

        		if (left < length && a[left] > a[largest]) {
           			largest = left;
        		}

        		if (right < length && a[right] > a[largest]) {
        	    	largest = right;
        		}

        		if (i == largest) {
        		    break;
        		}

        		await swapIndex(a, i, largest);
        		await drawArr(arr);
        		await sleep(time)
        		i = largest;
 		   	}
		}

		async function heapify(a, length) {
		    for (var i = Math.floor(length/2); i >= 0; i--) {
		        await max_heapify(a, i, length);
		    }
		}

		async function heapsort(a) {
    		await heapify(a, a.length-1);

    		for (var i = a.length - 1; i >= 0; i--) {
    	   	 	await swapIndex(a, i, 0);
        		await drawArr(arr);
        		await sleep(time)
        		await max_heapify(a, 0, i);
    		}	
		}

		heapsort(Arr);
	}

	async function cocktailSort(arr){
		var i, left=0, right = len-1, temp;
		while(left<right){
			for(i=left; i<right; i++){
				if(arr[i] > arr[i+1]){
					await swapIndex(arr,i,i+1);
					await drawArr(arr);
					await sleep(time)
				}
			}
			right--;
			for(i=right; i>left; i--){
				if(arr[i-1] > arr[i]){
					await swapIndex(arr,i-1,i);	
					await drawArr(arr);
					await sleep(time);
				}
			}
			left++;
		}
	}

	function reverseArr(arr){
			var maxIdx;
			const t = 0 ,
      			  len = arr.length;
  			for(var i = 0; i < len; i++){
    			maxIdx = i;
    			for(var  j = i+1; j<len; j++){
       				if(arr[j]>arr[maxIdx]){
          				maxIdx = j;
       				}
    			}
    			swapIndex(arr,i,maxIdx);
  			}
  			drawArr(arr);
  			return arr;
  	}

	rangeTime.oninput = function(){
		time = rangeTime.value;
		showTime.innerHTML = time;
	}

	rangeArr.oninput = function(){
		createArr(rangeArr.value);
		showLength.innerHTML = rangeArr.value;
		randomArr();
		drawArr(Arr);
	}