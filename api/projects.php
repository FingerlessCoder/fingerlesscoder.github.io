<?php
/**
 * API endpoint for projects data
 * Returns JSON for JavaScript consumption
 */

// Define base path for security
define('ABSPATH', dirname(__DIR__) . '/');
require_once '../functions.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$category = $_GET['category'] ?? 'all';
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 0;
$featured = isset($_GET['featured']) ? (bool)$_GET['featured'] : false;

$options = [
    'category' => $category,
    'featured' => $featured
];

if ($limit > 0) {
    $options['limit'] = $limit;
}

$projects = getProjects($options);

echo json_encode([
    'success' => true,
    'data' => $projects,
    'count' => count($projects)
], JSON_PRETTY_PRINT);
?>