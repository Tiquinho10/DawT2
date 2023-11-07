package co.mz.uem.dawt2.service;

import co.mz.uem.dawt2.model.Restaurante;
import co.mz.uem.dawt2.repository.RestauranteRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestauranteService {
    @Autowired
    private RestauranteRepository restauranteRepository;

    public List<Restaurante> listarRestaurantes() {
        return restauranteRepository.findAll();
    }

    public Restaurante adicionarRestaurante(Restaurante restaurante) {
        return restauranteRepository.save(restaurante);
    }

    public Restaurante atualizarRestaurante(Long id, Restaurante restaurante) {
        if (restauranteRepository.existsById(id)) {
            restaurante.setId(id);
            return restauranteRepository.save(restaurante);
        } else {
            throw new EntityNotFoundException("Restaurante não encontrado com o ID: " + id);
        }
    }

    public void excluirRestaurante(Long id) {
        restauranteRepository.deleteById(id);
    }

    public Restaurante buscarRestaurantePorId(Long id) {

        return restauranteRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("usuario nao encontrado")
        );
    }
}

