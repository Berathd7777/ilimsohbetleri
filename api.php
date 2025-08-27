<?php
// api.php - AJAX isteklerini karşılar
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$dataFile = 'sohbetler.json';

// JSON dosyasını oku
function readData() {
    global $dataFile;
    if (!file_exists($dataFile)) {
        return [];
    }
    $content = file_get_contents($dataFile);
    return json_decode($content, true) ?: [];
}

// JSON dosyasına yaz
function writeData($data) {
    global $dataFile;
    file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

// İstek tipini kontrol et
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        // Sohbetleri listele
        echo json_encode(readData());
        break;
        
    case 'POST':
        // Yeni sohbet ekle
        $sohbetler = readData();
        
        // ID oluştur
        $maxId = 0;
        foreach ($sohbetler as $sohbet) {
            if ($sohbet['id'] > $maxId) {
                $maxId = $sohbet['id'];
            }
        }
        
        $yeniSohbet = [
            'id' => $maxId + 1,
            'tarih' => $input['tarih'],
            'konusmaci' => $input['konusmaci'],
            'konu' => $input['konu'],
            'eklenme_tarihi' => date('Y-m-d H:i:s')
        ];
        
        $sohbetler[] = $yeniSohbet;
        writeData($sohbetler);
        
        echo json_encode(['success' => true, 'sohbet' => $yeniSohbet]);
        break;
        
    case 'DELETE':
        // Sohbet sil
        if (isset($_GET['id'])) {
            $silinecekId = (int)$_GET['id'];
            $sohbetler = readData();
            
            if ($silinecekId === 0) {
                // Tümünü sil
                writeData([]);
                echo json_encode(['success' => true, 'message' => 'Tüm sohbetler silindi']);
            } else {
                // Tek sohbet sil
                $sohbetler = array_filter($sohbetler, function($sohbet) use ($silinecekId) {
                    return $sohbet['id'] !== $silinecekId;
                });
                
                writeData(array_values($sohbetler));
                echo json_encode(['success' => true, 'message' => 'Sohbet silindi']);
            }
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
