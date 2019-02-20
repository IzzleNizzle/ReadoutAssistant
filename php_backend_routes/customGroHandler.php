<?php
	// Headers
	header("Content-type:application/json;charset=utf-8");
	
	// This files intention is to take the data from the gro tool and write it to a .csv file. 
	// Because data from gro comes JSON and not .csv, so we do this manually.
	
	// Setting Input Variables 
	$seller = $_POST['oracle'];
	$groType = $_POST['groType'];
	$dataPayload = $_POST['dataPayload'];
	$userID = $_POST['userID'];
	
	// Naming file
	$ts = date("mdYGis");
	$fileName = "{$seller}_{$userID}_{$groType}_{$ts}.csv";	
	
	
	// Creating .csv file 
	$csvfile = fopen("reports//{$fileName}", "w");	
	
	
	// Splitting incoming Gro data into an array so I can put it into a .csv file
	$split = explode("\n", $dataPayload);
	
	// Looping through array and adding to .csv file
	foreach ($split as &$i) {
		// Exploding each array item string into an array to be added .csv file
		$columnData = explode(",", $i);
		// Now that the string is an array, adding to .csv file
		fputcsv($csvfile, $columnData);
	}
	
	// Closing .csv file
	fclose($csvfile);

	
	// Creating response data payload
	$data['response'] = 'success';
	$data['content1'] = $dataPayload;
	$data['split'] = $split;
	$data['conData'] = $fileName;
	$data['groType'] = $groType;
	
	// Responding with Data
	echo json_encode($data);

?>	