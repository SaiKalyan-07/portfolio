/**
 * profileImage.js
 * Handles profile photo load/error with animated reveal and initials fallback.
 */

export function initProfileImage() {
  const profilePhoto    = document.querySelector('.profile-photo');
  const profileImage    = document.getElementById('profile-img');
  const profileFallback = document.getElementById('profile-fallback');

  if (!profilePhoto || !profileImage || !profileFallback) return;

  profileFallback.style.display = 'none';

  profileImage.addEventListener('load', () => {
    profileImage.style.opacity   = '0';
    profileImage.style.transform = 'scale(0.8)';
    profileFallback.style.display = 'none';

    setTimeout(() => {
      profileImage.style.transition = 'all 0.8s ease';
      profileImage.style.opacity    = '1';
      profileImage.style.transform  = 'scale(1)';
    }, 100);
  });

  profileImage.addEventListener('error', () => {
    profileImage.style.display     = 'none';
    profileFallback.style.display  = 'flex';
    profileFallback.style.animation = 'fadeInUp 0.8s ease forwards';
  });

  // Handle already-cached images
  if (profileImage.complete && profileImage.naturalHeight !== 0) {
    profileImage.dispatchEvent(new Event('load'));
  } else if (profileImage.complete && profileImage.naturalHeight === 0) {
    profileImage.dispatchEvent(new Event('error'));
  }

  // Hover effect
  profilePhoto.addEventListener('mouseenter', () => {
    profilePhoto.style.transform  = 'scale(1.05) rotateY(10deg)';
    profilePhoto.style.boxShadow  = '0 30px 60px rgba(0,255,136,0.4), inset 0 0 40px rgba(0,255,136,0.2)';
  });
  profilePhoto.addEventListener('mouseleave', () => {
    profilePhoto.style.transform  = '';
    profilePhoto.style.boxShadow  = '';
  });
}