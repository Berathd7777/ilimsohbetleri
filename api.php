<?php
header("Content-Type: application/json; charset=UTF-8");

// Veri dosyası
$file = "sohbetler.json";

// Dosya yoksa boş dizi oluştur
if (!file_exists($file)) {
    file_put_contents($file, json_encode([]));
}

// Dosyayı oku
$data = json_decode(file_get_contents($file), true);

// Hangi işlem?
$action = $_GET["action"] ?? "";

// Listeleme
if ($action === "list") {
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

// Ekleme
if ($action === "add" && $_SERVER["REQUEST_METHOD"] === "POST") {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!$input || !isset($input["tarih"], $input["konusmaci"], $input["konu"])) {
        echo json_encode(["success" => false, "error" => "Eksik veri gönderildi"]);
        exit;
    }

    // Yeni sohbet
    $yeni = [
        "tarih" => $input["tarih"],
        "konusmaci" => $input["konusmaci"],
        "konu" => $input["konu"]
    ];

    // Listeye ekle
    $data[] = $yeni;

    // JSON dosyasına yaz
    file_put_contents($file, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

    echo json_encode(["success" => true]);
    exit;
}

echo json_encode(["success" => false, "error" => "Geçersiz istek"]);
