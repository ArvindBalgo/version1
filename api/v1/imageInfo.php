<?php
include_once 'include_all.php';

$mode = $_GET['mode'];
if($mode == 0) {
    $category = new cata_category();
    $category = $category->rechercher();

    print json_encode($category);
    return;
}
else if ($mode == 1) {
    $category = new cata_category();
    $category->setLibelle($_GET["libelle"]);
    $category->setActive($_GET["active"]);
    $category->save();
    print "done";
}
else if($mode == 2) {
    $category = new cata_category();
    $category = $category->findByPrimaryKey(trim($_GET["id"]));
    $category->setLibelle($_GET["libelle"]);
    $category->setActive($_GET["active"]);
    $category->save();
}
else if($mode == 3) {
    $cata_image = new cata_image();
    $cata_image = $cata_image->rechercher();
    print json_encode($cata_image);
}
