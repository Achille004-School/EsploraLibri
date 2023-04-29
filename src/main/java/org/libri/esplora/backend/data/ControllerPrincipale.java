// package com.Achille004.FreeTransfer.backend.data;

// import java.io.IOException;
// import java.time.LocalDateTime;
// import java.util.NoSuchElementException;
// import java.util.Set;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Component;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.multipart.MultipartFile;

// import com.Achille004.FreeTransfer.backend.data.entity.User;
// import com.Achille004.FreeTransfer.backend.data.service.ProfilePictureService;
// import com.Achille004.FreeTransfer.backend.data.service.UserRepository;;

// @Component
// @RestController // no need to specify @ResponseBody for @RequestMapping methods
// @RequestMapping(path = "api")
// public class MainController {

//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private ProfilePictureService picManager;

//     @Autowired
//     private PasswordEncoder encoder;

//     // @PostMapping(path = "/register")
//     public String addUser(@RequestParam String username, @RequestParam String email, @RequestParam String password) {
//         if (this.userRepository.findByEmail(email) == null) {
//             return "An account is already bound to this email";
//         }

//         if (this.userRepository.findByUsername(username) == null) {
//             return "Username not available";
//         }

//         User account = new User();
//         account.setUsername(username);
//         account.setEmail(email);
//         account.setEncodedPassword(encoder.encode(password));
//         account.setRoles(Set.of(Role.USER));
//         account.setCreated(LocalDateTime.now());
//         userRepository.save(account);

//         return "OK:" + account.getId();
//     }

//     // @PostMapping(value = "/{userId}/profile-picture", consumes =
//     // MediaType.MULTIPART_FORM_DATA_VALUE)
//     public ResponseEntity<Void> setProfilePicture(@PathVariable("userId") Long id, @RequestParam MultipartFile file) {
//         ResponseEntity<Void> response;
//         try {
//             this.picManager.setProfilePicture(id, file);
//             response = ResponseEntity.ok().build();
//         } catch (NoSuchElementException e) {
//             // Accound not found
//             response = ResponseEntity.notFound().build();
//         } catch (IOException e) {
//             // Error in file reading
//             response = ResponseEntity.internalServerError().build();
//         }

//         return response;
//     }
    
//     @GetMapping(path = "all")
//     public Iterable<User> getAllUsers() {
//         // This returns a JSON or XML with the users
//         return userRepository.findAll();
//     }
// }

// /*
//  * document.getElementById('image-to-save').addEventListener('change',
//  * saveImage);
//  * 
//  * function saveImage(e){
//  * 
//  * let file = e.target.files[0];
//  * const formData = new FormData();
//  * formData.append('file', file);
//  * 
//  * fetch("http://localhost:8080/api/account/1/profile-picture", {
//  * method: 'POST',
//  * body: formData
//  * }).then(data => {
//  * document.getElementById("your-image").src = data.url + '?t=' + new
//  * Date().getTime();
//  * });
//  * 
//  * }
//  */