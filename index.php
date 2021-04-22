<?php

chdir(__DIR__);

if (php_sapi_name() !== 'cli-server') {
    die('this is only for the php development server');
}

// Serve as asset file from filesystem if non-PHP file and not root
if (
    is_file($_SERVER['DOCUMENT_ROOT'] . '/' . $_SERVER['SCRIPT_NAME']) && 
    $_SERVER["REQUEST_URI"] !== "/"
) {
    return false;
}

$filePath = realpath(ltrim($_SERVER["REQUEST_URI"], '/'));

function setFilePathToIndexInDirectory($filePath)
{
    if ($filePath && is_dir($filePath)) {
        // Set $filePath to index file in directory
        foreach (['index.php', 'index.html'] as $indexFile) {
            if ($filePath = realpath($filePath . DIRECTORY_SEPARATOR . $indexFile)) {
                break;
            }
        }
    }
}

function checkIsCircularReference($filePath)
{
    return $filePath == __DIR__ . DIRECTORY_SEPARATOR . 'index.php';
}

function checkIsDotFile($filePath)
{
    return substr(basename($filePath), 0, 1) == '.';
}

setFilepathToIndexInDirectory($filePath);

if ($filePath && is_file($filePath)) {
    
    if (!(checkIsCircularReference($filePath) || checkIsDotFile($filePath))) {
        // Serve PHP file through interpreter
        if (strtolower(substr($filePath, -4)) == '.php') {
            include $filePath;
        }
    }
    else {
        // disallowed file
        header("HTTP/1.1 404 Not Found");
        echo "404 Not Found";
    }
}
else {
    // rewrite to our index file
    include __DIR__ . DIRECTORY_SEPARATOR . 'pages/index.php';
}
?>

