# 项目与 AWS 关键信息记录

## 一、域名与解析

| 域名                  | 解析目标                                      | 说明                |
|----------------------|----------------------------------------------|---------------------|
| nav.bobbyspace.com   | d2n3rwa6t1yave.cloudfront.net                | CloudFront 分配     |
| api.bobbyspace.com   | my-alb-1056992294.ap-east-1.elb.amazonaws.com| ALB（应用负载均衡） |

---

## 二、ACM 证书

| 域名                  | 证书 ARN                                                                 | 区域         | 状态   |
|----------------------|-------------------------------------------------------------------------|--------------|--------|
| api.bobbyspace.com   | arn:aws:acm:ap-east-1:565364038125:certificate/f59b88ea-c9a0-4091-b455-f9fd06869f4e | ap-east-1    | ISSUED |
| nav.bobbyspace.com   | arn:aws:acm:us-east-1:565364038125:certificate/64fb5169-bd6e-41b1-bfdf-89b1c0fa96d4 | us-east-1    | ISSUED |

> 说明：CloudFront 证书必须在 us-east-1 区域，ALB 证书在实际部署区域。

---

## 三、CloudFront 配置

- **分配 ID**：ELXL1DI6ZQMBS
- **别名（Alias）**：nav.bobbyspace.com
- **源站**：hello-nav-frontend.s3-website.ap-east-1.amazonaws.com
- **证书 ARN**：arn:aws:acm:us-east-1:565364038125:certificate/64fb5169-bd6e-41b1-bfdf-89b1c0fa96d4
- **HTTPS 强制**：redirect-to-https

---

## 四、ALB 配置

- **名称**：my-alb
- **DNS**：my-alb-1056992294.ap-east-1.elb.amazonaws.com
- **ARN**：arn:aws:elasticloadbalancing:ap-east-1:565364038125:loadbalancer/app/my-alb/da15805ad24be671
- **监听端口**：
  - 80（HTTP，已配置）
  - 443（HTTPS，已配置，绑定 ACM 证书）
- **目标组**：hello-nav-tg（指向 EC2 3000 端口）

---

## 五、EC2 实例

- **实例 ID**：i-0aad6d2876a57c57e
- **公网 IP**：18.166.223.185
- **安全组 ID**：sg-0630dae8013d8b4d9
- **VPC**：vpc-0880d087d40d5bdd8

---

## 六、Route 53 托管区

- **托管区 ID**：Z01954253SFI3YUFIFIE5
- **主域名**：bobbyspace.com

---

## 七、前端/后端 API 配置建议

- 前端静态资源：通过 CloudFront 分发
- API 请求 baseURL：`https://api.bobbyspace.com`
- 所有流量均走 HTTPS

---

> 建议将本文件保存到团队知识库或项目根目录，便于后续维护和交接。

如需补充其他信息（如 S3、Lambda、CI/CD 等），请随时补充！ 