<?php
header("Content-type:application/json;charset=utf-8");
// Setting Variables from inputs
$seller = $_POST['oracle'];
$from = $_POST['from'];
$to = $_POST['to'];


$userID = $_POST['userID'];
$ts = date("mdYGis");
$fileName = "{$seller}_{$userID}_returns_{$ts}.csv";
$csvfile = fopen("reports//{$fileName}", "w");


$sql = ''; (SQL Query removed intentionally)

$rs=odbc_exec($conn,$sql);
if (!$rs)
  {exit("Error in SQL");}

$headerarray = array("SELLER_ID","BUYER_ID","BUYER","TRANS_ID","ITEM_ID","ITEM_TITLE","ITEM_CONDITION","RTRN_REASON","BUYER_CMNT_TXT","ITEM_PRICE_LC_AMT","SHPNG_FEE_LC_AMT","TOTAL_LC_AMT","ACTL_BUYER_TOTAL_RFND_LC_AMT","RTRN_ID","CPS_CLAIM_ID","RETURN_STATUS","CLOSE_REASON","RETURN_FAULT","RTRN_SITE_ID","TRANS_DT","SRC_CRE_DT","RTRN_CLOSE_DT","LEAF_CATEG_NAME","META_CATEG_NAME","CATEG_LVL2_NAME","CATEG_LVL3_NAME","CATEG_LVL4_NAME","CATEG_LVL5_NAME","CATEG_LVL6_NAME");
fputcsv($csvfile, $headerarray);

while (odbc_fetch_row($rs))
  {

$SELLER_ID=odbc_result($rs,"SELLER_ID");
$BUYER_ID=odbc_result($rs,"BUYER_ID");
$BUYER=odbc_result($rs,"BUYER");
$TRANS_ID=odbc_result($rs,"TRANS_ID");
$ITEM_ID=odbc_result($rs,"ITEM_ID");
$ITEM_TITLE=odbc_result($rs,"ITEM_TITLE");
$ITEM_CONDITION=odbc_result($rs,"ITEM_CONDITION");
$RTRN_REASON=odbc_result($rs,"RTRN_REASON");
$BUYER_CMNT_TXT=odbc_result($rs,"BUYER_CMNT_TXT");
$ITEM_PRICE_LC_AMT=odbc_result($rs,"ITEM_PRICE_LC_AMT");
$SHPNG_FEE_LC_AMT=odbc_result($rs,"SHPNG_FEE_LC_AMT");
$TOTAL_LC_AMT=odbc_result($rs,"TOTAL_LC_AMT");
$ACTL_BUYER_TOTAL_RFND_LC_AMT=odbc_result($rs,"ACTL_BUYER_TOTAL_RFND_LC_AMT");
$RTRN_ID=odbc_result($rs,"RTRN_ID");
$CPS_CLAIM_ID=odbc_result($rs,"CPS_CLAIM_ID");
$RETURN_STATUS=odbc_result($rs,"RETURN_STATUS");
$CLOSE_REASON=odbc_result($rs,"CLOSE_REASON");
$RETURN_FAULT=odbc_result($rs,"RETURN_FAULT");
$RTRN_SITE_ID=odbc_result($rs,"RTRN_SITE_ID");
$TRANS_DT=odbc_result($rs,"TRANS_DT");
$SRC_CRE_DT=odbc_result($rs,"SRC_CRE_DT");
$RTRN_CLOSE_DT=odbc_result($rs,"RTRN_CLOSE_DT");
$LEAF_CATEG_NAME=odbc_result($rs,"LEAF_CATEG_NAME");
$META_CATEG_NAME=odbc_result($rs,"META_CATEG_NAME");
$CATEG_LVL2_NAME=odbc_result($rs,"CATEG_LVL2_NAME");
$CATEG_LVL3_NAME=odbc_result($rs,"CATEG_LVL3_NAME");
$CATEG_LVL4_NAME=odbc_result($rs,"CATEG_LVL4_NAME");
$CATEG_LVL5_NAME=odbc_result($rs,"CATEG_LVL5_NAME");
$CATEG_LVL6_NAME=odbc_result($rs,"CATEG_LVL6_NAME");

$rowarray = array(
$SELLER_ID,
$BUYER_ID,
$BUYER,
$TRANS_ID,
$ITEM_ID,
$ITEM_TITLE,
$ITEM_CONDITION,
$RTRN_REASON,
$BUYER_CMNT_TXT,
$ITEM_PRICE_LC_AMT,
$SHPNG_FEE_LC_AMT,
$TOTAL_LC_AMT,
$ACTL_BUYER_TOTAL_RFND_LC_AMT,
$RTRN_ID,
$CPS_CLAIM_ID,
$RETURN_STATUS,
$CLOSE_REASON,
$RETURN_FAULT,
$RTRN_SITE_ID,
$TRANS_DT,
$SRC_CRE_DT,
$RTRN_CLOSE_DT,
$LEAF_CATEG_NAME,
$META_CATEG_NAME,
$CATEG_LVL2_NAME,
$CATEG_LVL3_NAME,
$CATEG_LVL4_NAME,
$CATEG_LVL5_NAME,
$CATEG_LVL6_NAME
);

fputcsv($csvfile, $rowarray);

 }

fclose($csvfile);
odbc_close($conn);

	// Responding with Data
	$data['response'] = 'success';
	$data['content1'] = $fileName;
	$data['conData'] = "dataisGood";
	echo json_encode($data);


?>
