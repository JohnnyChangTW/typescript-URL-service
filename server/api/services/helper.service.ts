import isValidDomain from 'is-valid-domain'
import ip from 'ip';

export class HelperService {
  isValidDomainName(domain: string): boolean {
    return isValidDomain(domain);
  }

  isIPv4(ipAddress: string): boolean {
    return ip.isV4Format(ipAddress);
  }

  isIPv6(ipAddress: string): boolean {
    return ip.isV6Format(ipAddress);
  }

}

export default new HelperService();
