
import { uploadImage, cadastraBrinquedo } from './api/api.js';

document.addEventListener('DOMContentLoaded', () => {
    let imageUrl = '';
    const token = localStorage.getItem("bearerToken");

    document.getElementById('upload-image').addEventListener('change', async function (event) {
        const preview = document.getElementById('imagePreview');
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                preview.innerHTML = `<img src="${e.target.result}" alt="Prévia da imagem">`;
            };
            reader.readAsDataURL(file);

            try {
                imageUrl = await uploadImage(file);
                console.log('Imagem carregada com sucesso:', imageUrl);
                localStorage.setItem("urlImagem", imageUrl);
            } catch (error) {
                console.error('Erro ao carregar a imagem:', error);
                alert('Erro ao carregar a imagem.');
            }
        }
    });

    document.getElementById('form-cadastro-brinquedo').addEventListener('submit', async function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const productName = document.getElementById('product-name').value;
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;

        try {
            await cadastraBrinquedo(productName, category, description, price, imageUrl, token);
        } catch (error) {
            console.error('Erro ao cadastrar o brinquedo:', error);
            alert('Erro ao cadastrar o brinquedo.');
        }
    });
});