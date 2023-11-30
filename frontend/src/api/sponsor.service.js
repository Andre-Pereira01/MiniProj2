import API_URL from './config.js'

export const sponsorService = {
    // Obtém a lista de patrocinadores
    async getSponsors(token) {
        let response = await fetch(`${API_URL}/sponsors`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw Error(handleResponses(response.status));
        }
    },
//adiciona 
    async addSponsor(token, payload) {
        const response = await fetch(`${API_URL}/sponsors`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(payload)
        })
        if (response.ok) {
            return await response.json();
        } else {
            throw Error(handleResponses(response.status));
        }
    },
//edita
    async editSponsor(token, payload) {
        const response = await fetch(`${API_URL}/sponsors/${payload._id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw Error(handleResponses(response.status));
        }
    },
//remove
    async removeSponsor(token, id) {
        const response = await fetch(`${API_URL}/sponsors/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw Error(handleResponses(response.status));
        }
    }

};
//função das respostas
function handleResponses(code) {
    let message = ""
    switch (code) {
      case 401:
        message = "Não está autorizado a executar esta ação!"
        break;
      case 409:
        message = "Já existe um patrocinador com este nome!"
        break;
      default:
        message = "Mensagem desconhecida"
        break;
    }
    return message
  }

export default sponsorService;