package co.mz.uem.dawt2.service;

import co.mz.uem.dawt2.model.User;
import co.mz.uem.dawt2.model.enums.Roles;
import co.mz.uem.dawt2.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Primary
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public List<User> findAll() {
        return repository.findAll();
    }
    @Transactional(readOnly = true)
    public User findById(Long id) {
        return checkUser(id);
    }

    @Transactional
    public User save(User user) {
        User entity = new User();
        entity.setRoles(Roles.ROLE_USER);
        entity.setFirstName(user.getFirstName());
        entity.setLastName(user.getLastName());
        entity.setEmail(user.getEmail());
        entity.setPassword(user.getPassword());
        return repository.save(entity);
    }

    @Transactional
    public User update(Long id, User user) {
        User entity = checkUser(id);
        String newEmail = user.getEmail();
        if (!newEmail.equals(entity.getEmail())) {
            checkEmail(newEmail);
        }

        entity.setFirstName(user.getFirstName());
        entity.setLastName(user.getLastName());
        entity.setEmail(user.getEmail());

        return entity;
    }

    public void checkEmail(String email) {
        Optional<User> obj = repository.findByEmail(email);

        if (obj.isPresent())
            throw new IllegalThreadStateException("O usuario com o email: " + email + " ja existe, por favor tente outro");
    }

    private User checkUser(Long id){
        Optional<User> obj = repository.findById(id);

        return obj.orElseThrow(
                () -> new IllegalArgumentException("Usuario com o id: " + id + " nao existe")
        );
    }

    @Transactional(readOnly = true)
    public User getUserByUserName(String username){
        return repository.findByEmail(username).orElseThrow(
                () -> new UsernameNotFoundException("Usuario nao encontrado")
        );
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByEmail(username).orElseThrow(
                () -> new UsernameNotFoundException("Usuario nao encontrado")
        );
    }
}