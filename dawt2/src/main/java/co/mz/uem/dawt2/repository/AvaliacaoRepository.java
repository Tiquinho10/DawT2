package co.mz.uem.dawt2.repository;

import co.mz.uem.dawt2.model.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
    List<Avaliacao> findByRestauranteId(Long restauranteId);
}
