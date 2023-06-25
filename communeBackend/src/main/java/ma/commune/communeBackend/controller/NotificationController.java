package ma.commune.communeBackend.controller;

import lombok.AllArgsConstructor;
import ma.commune.communeBackend.exception.NotificationExceptions.NotificationNotFoundException;
import ma.commune.communeBackend.model.Citizen;
import ma.commune.communeBackend.model.Notification;
import ma.commune.communeBackend.repository.CitizenRepo;
import ma.commune.communeBackend.repository.NotificationRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "${webapp}")
@AllArgsConstructor
public class NotificationController {
    private final NotificationRepo notificationRepo;
    private final CitizenRepo citizenRepo;

    @GetMapping("/notifications")
    @PreAuthorize("hasAnyRole('ADMIN','CITOYEN')")
    public List<Notification> getNotifications(){
        List<Notification> notifications= notificationRepo.findAll();
        if(SecurityContextHolder.getContext().getAuthentication().getAuthorities().contains(new SimpleGrantedAuthority("ROLE_CITOYEN"))){
            Citizen citizen = (Citizen) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            notifications.removeIf(notification -> !notification.getCitizen().equals(citizen));
        }
            return notifications;
    }
    @GetMapping("/notifications/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','CITOYEN')")
    public Notification getNotificationById(@PathVariable long id){
        Notification notification = notificationRepo.findById(id).orElseThrow(()->new NotificationNotFoundException("notification "+id+" pas trouvé"));
        if(SecurityContextHolder.getContext().getAuthentication().getAuthorities().contains(new SimpleGrantedAuthority("ROLE_CITOYEN"))){
            Citizen citizen = (Citizen) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if(!notification.getCitizen().equals(citizen))
                return null;
        }
        return notification;
    }
    @PostMapping("/notifications")
    @PreAuthorize("hasRole('ADMIN')")
    public Notification saveNotification(@RequestBody Notification notification){
        notification.setId(null);
        Citizen citizen = citizenRepo.findById(notification.getCitizen().getId()).orElseThrow(()->new NotificationNotFoundException("citizen "+notification.getCitizen().getId()+" pas trouvé"));
        notification.setCitizen(citizen);
        return notificationRepo.save(notification);
    }
    @DeleteMapping("/notifications/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteNotification(@PathVariable long id){
        if(!notificationRepo.existsById(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("notification "+id+" pas trouvé");
        notificationRepo.deleteById(id);
        return ResponseEntity.ok("notification "+id+" supprimé");
    }
    @PutMapping("/notifications/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> updateNotification(@PathVariable long id,@RequestBody Notification notification){
        if(!notificationRepo.existsById(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("notification "+id+" pas trouvé");
        notification.setId(id);
        notificationRepo.save(notification);
        return ResponseEntity.ok("notification "+id+" modifié");
    }

}
