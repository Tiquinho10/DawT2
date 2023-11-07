package co.mz.uem.dawt2.repository;

import co.mz.uem.dawt2.model.Solicitacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {
    List<Solicitacao> findByRestauranteId(Long restauranteId);
}
