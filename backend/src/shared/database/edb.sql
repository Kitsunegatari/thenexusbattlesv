-- =====================================================
-- BASE DE DATOS
-- =====================================================

CREATE DATABASE IF NOT EXISTS upb_company_ecommerce;
USE upb_company_ecommerce;

-- =====================================================
-- TABLA USERS
-- =====================================================

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('customer','admin') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLA PRODUCTS
-- =====================================================

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    abilities TEXT,
    image_url VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    currency ENUM('COP','USD','EUR') DEFAULT 'COP',
    type VARCHAR(50),
    is_promo BOOLEAN DEFAULT FALSE,
    discount_percentage INT DEFAULT 0,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ÍNDICES PARA FILTROS
CREATE INDEX idx_price ON products(price);
CREATE INDEX idx_type ON products(type);
CREATE INDEX idx_promo ON products(is_promo);

-- ÍNDICE FULLTEXT PARA BÚSQUEDA INTELIGENTE
ALTER TABLE products 
ADD FULLTEXT idx_fulltext (name, description, abilities);

-- =====================================================
-- TABLA WISHLIST
-- =====================================================

CREATE TABLE wishlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY unique_wishlist (user_id, product_id),

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- =====================================================
-- TABLA CARTS
-- =====================================================

CREATE TABLE carts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    status ENUM('active','saved','converted') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================
-- TABLA CART_ITEMS
-- =====================================================

CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,

    UNIQUE KEY unique_cart_product (cart_id, product_id),

    FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- =====================================================
-- TABLA ORDERS
-- =====================================================

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    cart_id INT,
    total DECIMAL(10,2) NOT NULL,
    currency ENUM('COP','USD','EUR') DEFAULT 'COP',
    status ENUM('pending','paid','failed') DEFAULT 'pending',
    transaction_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (cart_id) REFERENCES carts(id)
);

-- =====================================================
-- TABLA ORDER_ITEMS
-- =====================================================

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- =====================================================
-- DATOS DE PRUEBA (SEED)
-- =====================================================

INSERT INTO users (name, email, password, role)
VALUES 
('Admin User', 'admin@upb.com', 'hashed_password', 'admin'),
('Cliente Demo', 'cliente@upb.com', 'hashed_password', 'customer');

INSERT INTO products 
(name, description, abilities, image_url, price, currency, type, is_promo, discount_percentage, stock)
VALUES
('Dragon Supremo', 'Carta legendaria con poder ancestral.', 'Fuego eterno, vuelo', 'https://via.placeholder.com/300', 120000, 'COP', 'Legendaria', TRUE, 20, 10),
('Guerrero Oscuro', 'Carta épica de combate.', 'Ataque doble, sombra', 'https://via.placeholder.com/300', 80000, 'COP', 'Épica', FALSE, 0, 15),
('Hechicera Lunar', 'Controla la energía nocturna.', 'Magia lunar, escudo', 'https://via.placeholder.com/300', 95000, 'COP', 'Mágica', TRUE, 10, 8),
('Titán de Hierro', 'Defensa absoluta.', 'Blindaje, fuerza bruta', 'https://via.placeholder.com/300', 110000, 'COP', 'Defensiva', FALSE, 0, 5);